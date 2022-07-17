import * as THREE from "three";
import {
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
} from "three";
type MapTypes =
  | "albedo"
  | "normal"
  | "roughness"
  | "metalness"
  /* | "specular" */
  /* | "displacement" */
  /*   | "opacity" */
  | "ao";
/* | "refraction" */
/*   | "emission"; */

interface MapMeta {
  encoding: THREE.TextureEncoding;
}

const MapDetail: Record<MapTypes, MapMeta> = {
  albedo: { encoding: THREE.sRGBEncoding },
  normal: { encoding: THREE.LinearEncoding },
  roughness: { encoding: THREE.LinearEncoding },
  metalness: { encoding: THREE.LinearEncoding },
  /* displacement: { encoding: THREE.LinearEncoding }, */
  /*   opacity: { encoding: THREE.LinearEncoding }, */
  ao: { encoding: THREE.LinearEncoding },
  /* emission: { encoding: THREE.LinearEncoding }, */
};

type TextureSource = Partial<Record<MapTypes, string>>;

function hasProperty(
  textureSource: TextureSource,
  property: MapTypes
): boolean {
  return property in textureSource;
}

export async function loadTextures(
  material: MeshPhysicalMaterial | MeshStandardMaterial,
  textureSource: TextureSource,
  wrappingMode: THREE.Wrapping,
  repeatX?: number,
  repeatY?: number
): Promise<void> {
  const loader = new THREE.TextureLoader();
  const albedoMap: THREE.Texture | null = hasProperty(textureSource, "albedo")
    ? await loader.loadAsync(textureSource.albedo!)
    : null;

  const normalMap: THREE.Texture | null = hasProperty(textureSource, "normal")
    ? await loader.loadAsync(textureSource.normal!)
    : null;

  const roughnessMap: THREE.Texture | null = hasProperty(
    textureSource,
    "roughness"
  )
    ? await loader.loadAsync(textureSource.roughness!)
    : null;

  const metalnessMap: THREE.Texture | null = hasProperty(
    textureSource,
    "metalness"
  )
    ? await loader.loadAsync(textureSource.metalness!)
    : null;

  const aoMap: THREE.Texture | null = hasProperty(textureSource, "ao")
    ? await loader.loadAsync(textureSource.ao!)
    : null;

  if (albedoMap) {
    albedoMap.encoding = THREE.sRGBEncoding;
    albedoMap.wrapS = wrappingMode;
    albedoMap.wrapT = wrappingMode;
    if (
      wrappingMode === THREE.RepeatWrapping ||
      wrappingMode === THREE.MirroredRepeatWrapping
    )
      albedoMap.repeat.set(repeatX!, repeatY!);
  }

  if (normalMap) {
    normalMap.encoding = THREE.LinearEncoding;
    normalMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;
    if (
      wrappingMode === THREE.RepeatWrapping ||
      wrappingMode === THREE.MirroredRepeatWrapping
    )
      normalMap.repeat.set(repeatX!, repeatY!);
  }

  if (roughnessMap) {
    roughnessMap.encoding = THREE.LinearEncoding;
    roughnessMap.wrapS = THREE.RepeatWrapping;
    roughnessMap.wrapT = THREE.RepeatWrapping;
    if (
      wrappingMode === THREE.RepeatWrapping ||
      wrappingMode === THREE.MirroredRepeatWrapping
    )
      roughnessMap.repeat.set(repeatX!, repeatY!);
  }

  if (metalnessMap) {
    metalnessMap.encoding = THREE.LinearEncoding;
    metalnessMap.wrapS = THREE.RepeatWrapping;
    metalnessMap.wrapT = THREE.RepeatWrapping;
    if (
      wrappingMode === THREE.RepeatWrapping ||
      wrappingMode === THREE.MirroredRepeatWrapping
    )
      metalnessMap.repeat.set(repeatX!, repeatY!);
  }

  if (aoMap) {
    aoMap.encoding = THREE.LinearEncoding;
    aoMap.wrapS = THREE.RepeatWrapping;
    aoMap.wrapT = THREE.RepeatWrapping;
    if (
      wrappingMode === THREE.RepeatWrapping ||
      wrappingMode === THREE.MirroredRepeatWrapping
    )
      aoMap.repeat.set(repeatX!, repeatY!);
  }

  material.map = albedoMap;
  material.normalMap = normalMap;
  material.roughnessMap = roughnessMap;
  material.metalnessMap = metalnessMap;
  material.aoMap = aoMap;
}
