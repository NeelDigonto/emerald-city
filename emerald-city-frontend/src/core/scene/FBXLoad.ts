import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { RenderEngine } from "../RenderEngine";
import { SceneGraph, SceneObject, SceneObjectType } from "../SceneGraph";

//import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils";

export async function loadFBX(
  scene: THREE.Scene,
  sceneGraph: SceneGraph,
  renderEngine: RenderEngine
) {
  const fbxLoader = new FBXLoader();

  const model = await fbxLoader.loadAsync("models/xbot.fbx");
  const model2 = await fbxLoader.loadAsync("models/xbot.fbx");

  model.scale.set(0.02, 0.02, 0.02);
  model.position.set(-3.5, 0, 0);
  scene.add(model);
  sceneGraph.add(
    sceneGraph.root!.id,
    new SceneObject("Base T Pose 1", model, SceneObjectType.MeshObject, true)
  );

  //console.log(model);
  //renderEngine.editorControls.transformControls.attach(model);

  fbxLoader.load(
    "models/Breakdance 1990.fbx",
    (object) => {
      const mixer = new THREE.AnimationMixer(object);

      /* mixer.clipAction(object.animations[1]).play();

      renderEngine.engine.registerBeforeRenderCallback((delta) => {
        mixer.update(delta / 1000);
      });
 */
      object.scale.set(0.02, 0.02, 0.02);
      object.position.set(0, 0, 0);
      /* scene.add(object);
      sceneGraph.add(
        sceneGraph.root!.id,
        new SceneObject(
          "Base T Pose 2",
          object,
          SceneObjectType.MeshObject,
          true
        )
      ); */
    },
    (xhr) => {},
    (error) => {}
  );

  fbxLoader.load(
    "models/Breakdance 1990_without_skin.fbx",
    (object) => {
      const mixer = new THREE.AnimationMixer(model2);

      /*  mixer.clipAction(object.animations[0]).play();

      renderEngine.engine.registerBeforeRenderCallback((delta) => {
        mixer.update(delta / 1000);
      }); */

      model2.scale.set(0.02, 0.02, 0.02);
      model2.position.set(3.5, 0, 0);
      /* scene.add(model2);
      sceneGraph.add(
        sceneGraph.root!.id,
        new SceneObject(
          "Base T Pose 3",
          model2,
          SceneObjectType.MeshObject,
          true
        )
      ); */
    },
    (xhr) => {},
    (error) => {}
  );

  const apples = await fbxLoader.loadAsync("apples/t1.fbx");

  //scene.add(apples);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
}
