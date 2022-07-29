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

//export type TexturePack = Partial<Record<MapTypes, FileRef>>;

export enum SidebarPanel {
  None = "None",
  BasicShapes = "BasicShapes",
  Lights = "Lights",
  TexturePackImporter = "TextureImporter",
  MeshImporter = "MeshImporter",
  AnimationImporter = "AnimationImporter",
  MaterialCreator = "MaterialCreator",
  ModelCreator = "ModelCreator",
  ModelViewer = "ModelViewer",
  EditorSettings = "EditorSettings",
}

export enum DropObjectType {
  Model = "Model",
  Light = "Light",
  BasicShape = "BasicShape",
}

export interface DropData {
  dropObjectType: DropObjectType;
  data: any;
}
