import {
  Characters,
  ClientPlayerData,
  PlayerResponse,
  PlayerResponseType,
  PlayerStates,
  ServerPlayerData,
  ServerResponse,
  ServerResponseType,
} from "@backend/types/api/Core";
import { Engine } from "./Engine";

export class NetworkEngine {
  gameServer: WebSocket;
  engine: Engine;
  selfID: string = "";

  constructor(engine: Engine) {
    this.engine = engine;
    this.gameServer = new WebSocket("ws://localhost:7000");

    // Connection opened
    this.gameServer.addEventListener("open", (event) => {
      const data: PlayerResponse = {
        type: PlayerResponseType.PlayerJoined,
        name: "Bambboo",
        character: Characters.Remy,
        playerState: { translation: [0, 0, 0] },
      };

      this.gameServer.send(JSON.stringify(data));

      setInterval(() => {
        const data: PlayerResponse = {
          type: PlayerResponseType.GameStateUpdate,
          playerState: { translation: [0, 0, 0] },
        };

        this.gameServer.send(JSON.stringify(data));
        console.log("Sent Data");
      }, 5000);
    });

    // Listen for messages
    this.gameServer.addEventListener("message", (event) => {
      console.log("Received Data");
      const serverResponse: ServerResponse = JSON.parse(event.data);

      switch (serverResponse.type) {
        case ServerResponseType.GameStateUpdate: {
          console.log(
            this.selfID,
            this.engine.players,
            serverResponse.playerStates
          );
          Object.entries(serverResponse.playerStates!).forEach(
            ([playerID, playerState]) => {
              if (playerID !== this.selfID && this.engine.players.has(playerID))
                this.engine.setPlayerState(playerID, playerState);
            }
          );

          break;
        }

        case ServerResponseType.PlayerJoined: {
          this.engine.registerPlayer({
            playerID: serverResponse.playerJoinedID!,
            name: serverResponse.playerJoinedName!,
            character: serverResponse.playerJoinedCharacter!,
            playerState: serverResponse.playerJoinedState!,
          });
          break;
        }

        case ServerResponseType.ReportSelfID: {
          this.selfID = serverResponse.selfID!;
          break;
        }

        case ServerResponseType.PlayerExit: {
          this.engine.deRegisterPlayer(serverResponse.playerExitedID!);
          break;
        }
        default:
          break;
      }
    });

    this.gameServer.addEventListener("close", function (event) {
      console.error("Game Server Disconnected!");
    });
  }
}
