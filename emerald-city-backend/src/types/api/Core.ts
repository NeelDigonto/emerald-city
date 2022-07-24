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

  export interface GetPresignedPostUrls {
    bucket: string;
    key: string;
  }

  export type TexturePack = db.TexturePack;
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

  export enum Table {
    TexturePack = 'TexturePack',
  }
}
