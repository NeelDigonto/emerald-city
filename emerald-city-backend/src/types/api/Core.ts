export namespace api {
  export interface FileRef {
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

  export interface RequestModelProc {
    modelName: string;
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
    Basic = 'Basic',
    Standard = 'Standard',
    Physical = 'Physical',
  }

  export enum ModelType {
    FBX = 'FBX',
  }
  // add gtlf, glb and obj import

  export type TexturePack = db.TexturePack;
  export type Material = db.Material;
  export type Model = db.Model;
}

export namespace db {
  export interface TexturePack {
    id: string;
    texturePackName: string;

    albedo?: api.FileRef;
    normal?: api.FileRef;
    ao?: api.FileRef;
    metalness?: api.FileRef;
    roughness?: api.FileRef;
    pmaaao?: api.FileRef;

    albedoCompressed?: api.FileRef;
    normalCompressed?: api.FileRef;
    aoCompressed?: api.FileRef;
    metalnessCompressed?: api.FileRef;
    roughnessCompressed?: api.FileRef;
    pmaaaoCompressed?: api.FileRef;
  }

  export interface Material {
    id: string;
    texturePackID: string;
    materialName: string;
    type: 'Basic' | 'Standard' | 'Physical';

    baseColor: string;
    metalness: number;
    roughness: number;

    wrapS: api.WrapMode;
    wrapT: api.WrapMode;
    repeatX: number;
    repeatY: number;
  }

  export interface Model {
    type: api.ModelType;
    file: api.FileRef;
  }

  export enum Table {
    TexturePack = 'TexturePack',
    Material = 'Material',
    Model = 'Model',
  }
}
