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
  name: string;
  shortName: string;
}

export const textureMaps: Record<MapTypes, MapMeta> = {
  albedo: { space: "sRGB", name: "Albedo", shortName: "Albedo" },
  normal: { space: "linear", name: "Normal", shortName: "Normal" },
  roughness: { space: "linear", name: "Roughness", shortName: "Roughness" },
  metalness: { space: "linear", name: "Metalness", shortName: "Metalness" },
  ao: {
    space: "linear",
    name: "Ambient Occlusion",
    shortName: "Ambient Occlusion",
  },
  orm: {
    space: "linear",
    name: "Occlusion-Roughness-Metalness",
    shortName: "ORM",
  },
  pmaaao: {
    space: "linear",
    name: "Pre-multiplied Albedo and Ambient Occlusion",
    shortName: "PMAAAO",
  },
  /* displacement: { encoding: THREE.LinearEncoding }, */
  /*   opacity: { encoding: THREE.LinearEncoding }, */
  /* emission: { encoding: THREE.LinearEncoding }, */
};

export type TextureSource = Partial<Record<MapTypes, string>>;
