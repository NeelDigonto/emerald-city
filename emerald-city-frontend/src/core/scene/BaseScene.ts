import * as THREE from "three";
import { Engine } from "@src/core/Engine";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { loadTextures } from "../TextureManager";
import { SceneGraph, SceneObject } from "../SceneGraph";

import { RenderEngine } from "../RenderEngine";
import { loadFBX } from "./FBXLoad";
import * as api from "@backend/types/api/Core";

export async function setupScene(
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  sceneGraph: SceneGraph,
  renderEngine: RenderEngine
): Promise<void> {
  const rgbeLoader = new RGBELoader();
  console.log("Base Setup");

  const envMap = await rgbeLoader.loadAsync("/hdr/alps_field_1k.hdr");
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  envMap.encoding = THREE.LinearEncoding;
  scene.background = envMap;
  scene.environment = envMap; // ibl

  const planeWidth: number = 1000;
  const planeHeight: number = 1000;

  const groundGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
  const groundMaterial = new THREE.MeshStandardMaterial({
    //color: 0x00ff00,
    side: THREE.DoubleSide,
  });

  await loadTextures(
    groundMaterial,
    {
      albedo: "/pavement_pebbles_sfiubccb/1k/sfiubccb_1K_Albedo.jpg",
      normal: "/pavement_pebbles_sfiubccb/1k/sfiubccb_1K_Normal.jpg",
      roughness: "pavement_pebbles_sfiubccb/1k/sfiubccb_1K_Roughness.jpg",
      ao: "pavement_pebbles_sfiubccb/1k/sfiubccb_1K_AO.jpg",
    },
    THREE.RepeatWrapping,
    planeWidth * 0.5,
    planeHeight * 0.5
  );

  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.position.set(0, 0, 0);
  ground.rotateX(THREE.MathUtils.degToRad(-90));
  scene.add(ground);
  if (sceneGraph.root === null)
    throw new Error("Scene Graph Root not Initialized");

  sceneGraph.add(
    sceneGraph.root.id,
    new SceneObject(
      "Ground",
      ground,
      api.SceneObjectType.UnkownMeshObject,
      false
    )
  );

  let boxCount: number = 0;

  const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
  const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xfffdd0 });

  /*   for (let x = 0; x < 100; x++)
    (() => {
      const box = new THREE.Mesh(boxGeometry, boxMaterial);
      box.position.setY(1);
      box.position.setX(Math.floor(Math.random() * 100) - 50);
      box.position.setZ(Math.floor(Math.random() * 100) - 50);
      scene.add(box);
      sceneGraph.add(
        sceneGraph.root!.id,
        new SceneObject(
          `Box ${boxCount++}`,
          box,
          api.SceneObjectType.MeshObject,
          true
        )
      );
    })(); */

  camera.position.set(0, 1.75, 5);

  scene.add(new THREE.AmbientLight(0xffffff));
  const plight = new THREE.PointLight(0xffffff, 100);
  plight.position.set(0, 100, 100);
  scene.add(plight);

  loadFBX(scene, sceneGraph, renderEngine);
}
