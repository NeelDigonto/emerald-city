export interface User {
  name: string;
}

export interface TextureUploadDetail {
  fname: string;
  flength: number;
}

export interface TextureUploadParams {
  texturePackName: string;
  albedo: boolean;
  normal: boolean;
  ao: boolean;
  metalness: boolean;
  roughness: boolean;
}

export interface TextureUploadedParams {
  texturePackName: string;
  albedo?: string;
  normal?: string;
  ao?: string;
  metalness?: string;
  roughness?: string;
}

export interface GetPresignedPostUrls {
  bucket: string;
  key: string;
}
