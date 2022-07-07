import * as THREE from "three";
import { Engine } from "@src/core/Engine";

export async function setupScene(engine: Engine): Promise<void> {
  const loader = new THREE.TextureLoader();
  const albedoMap = await loader.loadAsync(
    "/pavement_pebbles_sfiubccb/1k/sfiubccb_1K_Albedo.jpg"
  );
  const normalMap = await loader.loadAsync(
    "/pavement_pebbles_sfiubccb/1k/sfiubccb_1K_Normal.jpg"
  );

  const roughnessMap = await loader.loadAsync(
    "/pavement_pebbles_sfiubccb/1k/sfiubccb_1K_Roughness.jpg"
  );

  const aoMap = await loader.loadAsync(
    "/pavement_pebbles_sfiubccb/1k/sfiubccb_1K_AO.jpg"
  );

  // check if roughness and albedo ar working or not

  albedoMap.wrapS = THREE.RepeatWrapping;
  albedoMap.wrapT = THREE.RepeatWrapping;

  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;

  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;

  aoMap.wrapS = THREE.RepeatWrapping;
  aoMap.wrapT = THREE.RepeatWrapping;

  albedoMap.repeat.set(10, 10);
  normalMap.repeat.set(10, 10);
  //roughnessMap.repeat.set(10, 10);
  //aoMap.repeat.set(10, 10);

  const width = 100; // ui: width
  const height = 100; // ui: height
  const geometry = new THREE.PlaneGeometry(width, height);
  const material = new THREE.MeshPhysicalMaterial({
    //color: 0x00ff00,
    map: albedoMap,
    normalMap: normalMap,
    roughnessMap: roughnessMap,
  });
  const light = new THREE.PointLight(0xffffff, 50);
  light.position.set(10, 10, 10);
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, 0, 0);
  engine.scene.add(cube);
  engine.scene.add(light);

  engine.camera.position.set(0, -10, 5);
  engine.camera.updateMatrix();
}
