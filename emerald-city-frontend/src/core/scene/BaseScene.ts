import * as THREE from "three";
import { Engine } from "@src/core/Engine";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
import { loadTextures } from "../TextureManager";
import { SceneGraph, SceneObject, SceneObjectType } from "../SceneGraph";
import { User } from "@backend/types/api/Core";
import { RenderEngine } from "../RenderEngine";

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
  const groundMaterial = new THREE.MeshPhysicalMaterial({
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
    new SceneObject("Ground", ground, SceneObjectType.MeshObject)
  );

  let boxCount: number = 0;

  const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
  const boxMaterial = new THREE.MeshPhysicalMaterial({ color: 0xfffdd0 });

  for (let x = 0; x < 100; x++)
    (() => {
      const box = new THREE.Mesh(boxGeometry, boxMaterial);
      box.position.setY(1);
      box.position.setX(Math.floor(Math.random() * 100) - 50);
      box.position.setZ(Math.floor(Math.random() * 100) - 50);
      scene.add(box);
      sceneGraph.add(
        sceneGraph.root!.id,
        new SceneObject(`Box ${boxCount++}`, box, SceneObjectType.MeshObject)
      );

      renderEngine.editorControls.transformControls.attach(box);
    })();

  /*   const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
  const boxMaterial = new THREE.MeshPhysicalMaterial({ color: 0xfffdd0 });
  const box = new THREE.Mesh(boxGeometry, boxMaterial);
  box.position.setY(1);
  engine.scene.add(box); */

  /* const light = new THREE.PointLight(0xffffff, 50);
  light.position.set(0, 0, 10);
  engine.scene.add(light); */

  camera.position.set(0, 1.75, 2);

  /*   engine.controls?.registerRaycastCallback((intersectedObject) => {
    // if (engine.outlinePass && intersectedObject)
    //  engine.outlinePass.selectedObjects = [intersectedObject]; 
    if (intersectedObject) {
     if(intersectedObject instanceof THREE.Mesh<THREE.BoxGeometry,THREE.MeshPhysicalMaterial>)
     (intersectedObject as THREE.Mesh<THREE.BoxGeometry,THREE.MeshPhysicalMaterial>).material.color.set(0xffffff);
     console.log((intersectedObject as THREE.Mesh<THREE.BoxGeometry,THREE.MeshPhysicalMaterial>).material.color);
    }
  }); */
  //engine.camera.lookAt(0, 0, 0);
  //engine.camera.rotateX(THREE.MathUtils.degToRad(45));
  //engine.controls!.update(1);
  //engine.camera.updateMatrix();
}
