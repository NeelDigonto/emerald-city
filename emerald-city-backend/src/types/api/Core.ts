import { WebSocketServer, WebSocket } from 'ws';

export interface FileRef {
  fuuid: string;
  bucket: string;
  key: string;
  byteLength: number;
}

export interface RequestImageProc {
  texturePackName: string;
  albedo: boolean;
  normal: boolean;
  ao: boolean;
  metalness: boolean;
  roughness: boolean;
}

export interface RequestMeshProc {
  name: string;
  bytelength: number;
}

export interface GetPresignedPostUrls {
  bucket: string;
  key: string;
}

export enum WrapMode {
  RepeatWrapping = 'RepeatWrapping',
  ClampToEdgeWrapping = 'ClampToEdgeWrapping',
  MirroredRepeatWrapping = 'MirroredRepeatWrapping',
}

export enum MaterialType {
  //Basic = 'Basic',
  Standard = 'Standard',
  Physical = 'Physical',
}

export enum PrimitiveMesh {
  Box = 'Box',
  Capsule = 'Capsule',
  Circle = 'Circle',
  Cone = 'Cone',
  Cylinder = 'Cylinder',
  Plane = 'Plane',
  Ring = 'Ring',
  Sphere = 'Sphere',
  Torus = 'Torus',
}

export enum Light {
  Directional = 'Directional',
  Point = 'Point',
  Spot = 'Spot',
  RectArea = 'RectArea',
  Ambient = 'Ambient',
}

export enum ImportedMeshType {
  FBX = 'FBX',
  // add gtlf, glb and obj import
}

export enum ModelType {
  Basic = 'Basic',
  Imported = 'Imported',
}

export interface TexturePack {
  id: string;
  texturePackName: string;

  albedo?: FileRef;
  normal?: FileRef;
  ao?: FileRef;
  metalness?: FileRef;
  roughness?: FileRef;
  pmaaao?: FileRef;

  albedoCompressed?: FileRef;
  normalCompressed?: FileRef;
  aoCompressed?: FileRef;
  metalnessCompressed?: FileRef;
  roughnessCompressed?: FileRef;
  pmaaaoCompressed?: FileRef;
}

export interface Material {
  id: string;
  texturePackID: string;
  materialName: string;
  type: MaterialType;

  baseColor: string;
  metalness: number;
  roughness: number;

  wrapS: WrapMode;
  wrapT: WrapMode;
  repeatX: number;
  repeatY: number;
}

export interface ImportedMesh {
  id: string;
  name: string;
  type: ImportedMeshType;
  file: FileRef;
}

export interface Model {
  id: string;
  name: string;
  type: ModelType;
  importedMeshID: string;
  primitiveMeshType?: PrimitiveMesh;
  materialID: string;
}

export interface Geometry {
  id: string;
}

export enum Table {
  TexturePack = 'TexturePack',
  Material = 'Material',
  ImportedMesh = 'ImportedMesh',
  Model = 'Model',
}

// pnos, playerid,

export enum Characters {
  Remy = 'Remy',
}

export interface PlayerState {
  translation: [number, number, number];
}

export interface PlayerStates {
  [playerID: string]: PlayerState;
}

export interface GameState {
  playerStates: PlayerStates;
}

export enum ServerResponseType {
  PlayerJoined,
  PlayerExit,
  GameStateUpdate,
}

export interface ServerResponse {
  type: ServerResponseType;
  playerJoinedName?: string;
  playerJoinedID?: string;
  playerJoinedCharacter?: Characters;
  playerJoinedState?: PlayerState;
  playerExitedID?: string;
  gameState?: GameState;
  playerStates?: PlayerStates;
}

export enum PlayerResponseType {
  PlayerJoined,
  GameStateUpdate,
}

export interface PlayerResponse {
  type: PlayerResponseType;
  name?: string;
  character?: Characters;
  playerState: PlayerState;
}

export interface ServerPlayerData {
  playerID: string;
  name: string;
  character: Characters;
  playerState: PlayerState;
  clientSocket: WebSocket;
}

export type ClientPlayerData = Omit<ServerPlayerData, 'clientSocket'>;

/* export interface LOD {
  uuid: string;
  level: number;
  geometry: FileRef;
}

export interface Model {
  name: string;
  lods: LOD[];
  animation?: Animation[];
}
 */
