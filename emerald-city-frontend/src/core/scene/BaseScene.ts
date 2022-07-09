import * as THREE from "three";
import { Engine } from "@src/core/Engine";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export async function setupScene(engine: Engine): Promise<void> {
  const loader = new THREE.TextureLoader();
  const rgbeLoader = new RGBELoader();

  const envMap = await rgbeLoader.loadAsync("/hdr/alps_field_4k.hdr");
  envMap.mapping = THREE.EquirectangularReflectionMapping;

  engine.scene.background = envMap;
  engine.scene.environment = envMap; // ibl

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

  /*   const anis = engine.renderer!.capabilities.getMaxAnisotropy();
  console.log(anis); */

  const planeWidth: number = 1000;
  const planeHeight: number = 1000;

  albedoMap.wrapS = THREE.RepeatWrapping;
  albedoMap.wrapT = THREE.RepeatWrapping;

  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;

  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;

  aoMap.wrapS = THREE.RepeatWrapping;
  aoMap.wrapT = THREE.RepeatWrapping;

  const repeatX: number = planeWidth * 0.5;
  const repeatY: number = planeHeight * 0.5;

  albedoMap.repeat.set(repeatX, repeatY);
  normalMap.repeat.set(repeatX, repeatY);
  roughnessMap.repeat.set(repeatX, repeatY);
  aoMap.repeat.set(repeatX, repeatY);

  const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
  const material = new THREE.MeshPhysicalMaterial({
    //color: 0x00ff00,
    map: albedoMap,
    normalMap: normalMap,
    roughnessMap: roughnessMap,
    aoMap: aoMap,
  });

  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, 0, 0);
  cube.rotateX(THREE.MathUtils.degToRad(-90));
  engine.scene.add(cube);

  /*   const light = new THREE.PointLight(0xffffff, 50);
  light.position.set(0, 0, 10);
  engine.scene.add(light); */

  engine.camera.position.set(0, 1.75, 2);
  //engine.camera.lookAt(0, 0, 0);
  //engine.camera.rotateX(THREE.MathUtils.degToRad(45));
  //engine.controls!.update(1);
  //engine.camera.updateMatrix();
}
