import { WebSocketServer } from 'ws';
import {
  ClientPlayerData,
  PlayerResponse,
  PlayerResponseType,
  PlayerStates,
  ServerPlayerData,
  ServerResponse,
  ServerResponseType,
} from './types/api/Core.js';
import { v4 as uuidv4 } from 'uuid';

export class GameServer {
  players: Map<string, ServerPlayerData> = new Map<string, ServerPlayerData>();
  server: WebSocketServer;

  constructor() {
    this.server = new WebSocketServer({ port: 7000, perMessageDeflate: false });

    this.server.on('connection', (player) => {
      const playerID = uuidv4();

      player.on('message', (playerResponseRaw: string) => {
        const playerResponse: PlayerResponse = JSON.parse(playerResponseRaw);
        console.log(playerResponse);

        switch (playerResponse.type) {
          case PlayerResponseType.GameStateUpdate: {
            // update
            this.players.get(playerID).playerState = playerResponse.playerState;

            //send other updates
            let playerStates: PlayerStates;

            this.players.forEach((serverPlayerData) => {
              if (serverPlayerData.playerID === playerID) return;

              playerStates[serverPlayerData.playerID] =
                serverPlayerData.playerState;
            });

            const gameUpdate: ServerResponse = {
              type: ServerResponseType.GameStateUpdate,
              playerStates: playerStates,
            };

            this.players.forEach((serverPlayerData) => {
              if (serverPlayerData.playerID === playerID) return;

              serverPlayerData.clientSocket.send(JSON.stringify(gameUpdate));
            });

            break;
          }

          case PlayerResponseType.PlayerJoined: {
            this.players.forEach((serverPlayerData) => {
              if (serverPlayerData.playerID === playerID) return;

              const data: ServerResponse = {
                type: ServerResponseType.PlayerJoined,
                playerJoinedID: playerID,
                playerJoinedCharacter: playerResponse.character,
                playerJoinedState: playerResponse.playerState,
              };
              serverPlayerData.clientSocket.send(JSON.stringify(data));
            });

            this.players.set(playerID, {
              playerID: playerID,
              name: playerResponse.name,
              character: playerResponse.character,
              playerState: playerResponse.playerState,
              clientSocket: player,
            });

            break;
          }
          default:
            break;
        }
      });

      player.on('close', () => {
        this.players.delete(playerID);

        this.players.forEach((serverPlayerData) => {
          const data: ServerResponse = {
            type: ServerResponseType.PlayerExit,
            playerExitedID: playerID,
          };
          serverPlayerData.clientSocket.send(JSON.stringify(data));
        });
      });
    });
  }
}
