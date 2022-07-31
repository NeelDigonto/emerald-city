import WebSocket, { WebSocketServer } from 'ws';
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
import { clearInterval } from 'timers';

const echoGameState = (
  playerID: string,
  players: Map<string, ServerPlayerData>,
) => {
  let playerStates: PlayerStates;

  players.forEach((serverPlayerData) => {
    if (serverPlayerData.playerID === playerID) return;

    playerStates[serverPlayerData.playerID] = serverPlayerData.playerState;
  });

  const gameUpdate: ServerResponse = {
    type: ServerResponseType.GameStateUpdate,
    playerStates: playerStates,
  };

  players.forEach((serverPlayerData) => {
    if (serverPlayerData.playerID === playerID) return;

    serverPlayerData.clientSocket.send(JSON.stringify(gameUpdate));
  });
};

class Player {
  playerPool: Map<string, Player>;

  playerID: string;
  socket: WebSocket;
  playerData: ServerPlayerData;
  broadcasterTimer: NodeJS.Timer | null;

  constructor(
    playerID: string,
    socket: WebSocket,
    playerPool: Map<string, Player>,
  ) {
    this.playerID = playerID;
    this.socket = socket;
    this.playerPool = playerPool;

    this.socket.on('message', this.handleMessage.bind(this));

    this.socket.on('close', this.handleClose.bind(this));
  }

  handleMessage(playerResponseRaw: string) {
    const playerResponse: PlayerResponse = JSON.parse(playerResponseRaw);

    switch (playerResponse.type) {
      case PlayerResponseType.GameStateUpdate: {
        this.handleClientGameStateUpdate(playerResponse);
        break;
      }

      case PlayerResponseType.PlayerJoined: {
        this.handlePlayerJoined(playerResponse);
        const gameUpdate: ServerResponse = {
          type: ServerResponseType.ReportSelfID,
          selfID: this.playerID,
        };
        this.socket.send(JSON.stringify(gameUpdate));
        this.broadcasterTimer = setInterval(
          this.handleBroadcast.bind(this),
          50,
        );
        break;
      }
      default:
        break;
    }
  }

  handleClientGameStateUpdate(playerResponse: PlayerResponse) {
    // update
    this.playerPool.get(this.playerID).playerData.playerState =
      playerResponse.playerState;
  }

  handleBroadcast() {
    if (
      this.socket.readyState === WebSocket.CLOSED ||
      this.socket.readyState === WebSocket.CLOSING
    ) {
      this.handleClose();
      return;
    }

    const playerStates: PlayerStates = {};

    this.playerPool.forEach((aPlayer) => {
      //if (aPlayer.playerID === this.playerID) return;

      if (aPlayer.socket.readyState === WebSocket.OPEN && aPlayer.playerData)
        playerStates[aPlayer.playerID] = aPlayer.playerData.playerState;
    });

    const gameUpdate: ServerResponse = {
      type: ServerResponseType.GameStateUpdate,
      playerStates: playerStates,
    };

    this.playerPool.forEach((aPlayer) => {
      //if (aPlayer.playerID === this.playerID) return;

      if (
        aPlayer.socket.readyState === WebSocket.CLOSED ||
        aPlayer.socket.readyState === WebSocket.CLOSING
      ) {
        aPlayer.handleClose();
        return;
      }

      if (aPlayer.socket.readyState === WebSocket.OPEN)
        aPlayer.playerData.clientSocket.send(JSON.stringify(gameUpdate));
    });
    //console.log(this.playerID, gameUpdate);
  }

  handlePlayerJoined(playerResponse: PlayerResponse) {
    this.playerData = {
      playerID: this.playerID,
      name: playerResponse.name,
      character: playerResponse.character,
      playerState: playerResponse.playerState,
      clientSocket: this.socket,
      /*  echoIntervalTimer: setInterval(
        echoGameState.bind(null, playerID, this.players),
        1000,
      ), */
    };

    this.playerPool.forEach((aPlayer) => {
      if (aPlayer.playerID === this.playerID) return;

      const data: ServerResponse = {
        type: ServerResponseType.PlayerJoined,
        playerJoinedID: this.playerID,
        playerJoinedCharacter: playerResponse.character,
        playerJoinedState: playerResponse.playerState,
      };
      aPlayer.playerData.clientSocket.send(JSON.stringify(data));
    });
  }

  handleClose() {
    clearInterval(this.broadcasterTimer);

    this.playerPool.forEach((aPlayer) => {
      const data: ServerResponse = {
        type: ServerResponseType.PlayerExit,
        playerExitedID: this.playerID,
      };
      aPlayer.playerData.clientSocket.send(JSON.stringify(data));
    });

    this.playerPool.delete(this.playerID);
  }
}

export class GameServer {
  playerPool: Map<string, Player> = new Map<string, Player>();
  server: WebSocketServer;
  p1 = true;

  constructor() {
    this.server = new WebSocketServer({ port: 7000, perMessageDeflate: false });

    this.server.on('connection', (playerSocket) => {
      /* let playerID: string;
      if (this.p1) {
        this.p1 = false;
        playerID = 'player1';
      } else {
        playerID = 'player2';
      } */
      const playerID = uuidv4();

      this.playerPool.set(
        playerID,
        new Player(playerID, playerSocket, this.playerPool),
      );
    });
  }
}
