import * as THREE from "three";

export type MapTypes =
  | "albedo"
  | "normal"
  | "roughness"
  | "metalness"
  | "ao"
  | "orm"
  | "pmaaao"; //pre multiplied albedo and ambient occlsion
/* | "specular" */
/* | "refraction" */
/*   | "emission"; */

export interface MapMeta {
  space: "sRGB" | "linear";
  tag: MapTypes;
  name: string;
  shortName: string;
}

export const textureMaps: Record<MapTypes, MapMeta> = {
  albedo: { tag: "albedo", space: "sRGB", name: "Albedo", shortName: "Albedo" },
  normal: {
    tag: "normal",
    space: "linear",
    name: "Normal",
    shortName: "Normal",
  },
  roughness: {
    tag: "roughness",
    space: "linear",
    name: "Roughness",
    shortName: "Roughness",
  },
  metalness: {
    tag: "metalness",
    space: "linear",
    name: "Metalness",
    shortName: "Metalness",
  },
  ao: {
    tag: "ao",
    space: "linear",
    name: "Ambient Occlusion",
    shortName: "Ambient Occlusion",
  },
  orm: {
    tag: "orm",
    space: "linear",
    name: "Occlusion-Roughness-Metalness",
    shortName: "ORM",
  },
  pmaaao: {
    tag: "pmaaao",
    space: "linear",
    name: "Pre-multiplied Albedo and Ambient Occlusion",
    shortName: "PMAAAO",
  },
  /* displacement: { encoding: THREE.LinearEncoding }, */
  /*   opacity: { encoding: THREE.LinearEncoding }, */
  /* emission: { encoding: THREE.LinearEncoding }, */
};

export type TextureSource = Partial<Record<MapTypes, string>>;

export interface Animation {
  uuid: string;
  blendMode: number;
  duration: number;
  name: string;
  tracks: number;
}

export interface LOD {
  uuid: string;
  level: number;
  geometry: FileRef;
}

export interface Model {
  name: string;
  lods: LOD[];
  animation?: Animation[];
}

export interface FileRef {
  fname: string;
  fuuid: string;
  flink: string;
  ftlik: string;
}

export enum MaterialType {
  Basic,
  Standard,
  Physical,
}

export type TexturePack = Partial<Record<MapTypes, FileRef>>;

export interface Material {
  uuid: string;
  name: string;
  materialType: MaterialType;
  baseColor: number;
  texturePackID: string;
}

export interface Mesh {
  model: Model;
  material: Material;
}

export enum SidebarPanel {
  None,
  BasicShapes,
  Lights,
  TexturePackImporter,
  ModelImporter,
  AnimationImporter,
  MaterialCreator,
  MeshCreator,
}
