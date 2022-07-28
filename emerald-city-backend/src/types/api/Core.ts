export namespace api {
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

  export enum Characters {}

  export type TexturePack = db.TexturePack;
  export type Material = db.Material;
  export type ImportedMesh = db.ImportedMesh;
  export type Model = db.Model;
  export type Geometry = db.Geometry;
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

  export enum MaterialType {
    Basic = 'Basic',
    Standard = 'Standard',
    Physical = 'Physical',
  }

  export interface Material {
    id: string;
    texturePackID: string;
    materialName: string;
    type: MaterialType;

    baseColor: string;
    metalness: number;
    roughness: number;

    wrapS: api.WrapMode;
    wrapT: api.WrapMode;
    repeatX: number;
    repeatY: number;
  }

  export interface ImportedMesh {
    id: string;
    name: string;
    type: api.ImportedMeshType;
    file: api.FileRef;
  }

  export interface Model {
    id: string;
    name: string;
    type: api.ModelType;
    importedMeshID: string;
    primitiveMeshType?: api.PrimitiveMesh;
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
}

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
