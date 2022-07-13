import * as THREE from "three";
import { Engine } from "@src/core/Engine";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
import { loadTextures } from "../TextureManager";
import { SceneObject, SceneObjectType } from "../SceneGraph";
import { User } from "@backend/types/api/Core";

export async function setupScene(engine: Engine): Promise<void> {
  const rgbeLoader = new RGBELoader();
  console.log("Base Setup");

  const envMap = await rgbeLoader.loadAsync("/hdr/alps_field_1k.hdr");
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  envMap.encoding = THREE.LinearEncoding;
  engine.scene.background = envMap;
  engine.scene.environment = envMap; // ibl

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
  engine.scene.add(ground);
  if (!engine.sceneGraph.root)
    throw new Error("Scene Graph Root not Initialized");

  engine.sceneGraph.add(
    engine.sceneGraph.root.id,
    new SceneObject("Ground", ground, SceneObjectType.MeshObject)
  );

  let boxCount: number = 0;

  const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
  const boxMaterial = new THREE.MeshPhysicalMaterial({ color: 0xfffdd0 });

  for (let x = 0; x < 10; x++)
    (() => {
      const box = new THREE.Mesh(boxGeometry, boxMaterial);
      box.position.setY(1);
      box.position.setX(Math.floor(Math.random() * 100) - 50);
      box.position.setZ(Math.floor(Math.random() * 100) - 50);
      engine.scene.add(box);
      engine.sceneGraph.add(
        engine.sceneGraph.root!.id,
        new SceneObject(`Box ${boxCount++}`, box, SceneObjectType.MeshObject)
      );

      /*       const transformControls = new TransformControls(
        engine.camera,
        engine.renderer!.domElement
      );
      transformControls.addEventListener("change", () =>
        engine.renderer!.render(engine.scene, engine.camera)
      );
      transformControls.setSpace("local");
      engine.scene.add(transformControls);
      transformControls.attach(box);
      transformControls.setMode("rotate"); */
    })();

  /*   const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
  const boxMaterial = new THREE.MeshPhysicalMaterial({ color: 0xfffdd0 });
  const box = new THREE.Mesh(boxGeometry, boxMaterial);
  box.position.setY(1);
  engine.scene.add(box); */

  /* const light = new THREE.PointLight(0xffffff, 50);
  light.position.set(0, 0, 10);
  engine.scene.add(light); */

  engine.camera.position.set(0, 1.75, 2);
  engine.controls?.registerRaycastCallback((intersectedObject) => {
    if (engine.outlinePass && intersectedObject)
      engine.outlinePass.selectedObjects = [intersectedObject];
  });
  //engine.camera.lookAt(0, 0, 0);
  //engine.camera.rotateX(THREE.MathUtils.degToRad(45));
  //engine.controls!.update(1);
  //engine.camera.updateMatrix();
}
