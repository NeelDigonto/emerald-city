import { Engine } from "@src/core/Engine";
import { RenderEngine } from "@src/core/RenderEngine";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

//import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils";

export async function setupCharacterAndCamera(
  scene: THREE.Scene,
  engine: Engine
) {
  const fbxLoader = new FBXLoader();

  const model = await fbxLoader.loadAsync("Remy.fbx");

  model.scale.set(0.01, 0.01, 0.01);
  model.rotateOnWorldAxis(
    new THREE.Vector3(0, 1, 0),
    THREE.MathUtils.degToRad(180)
  );
  //model.position.set(3.5, 0, 0);
  scene.add(model);

  engine.character = model;

  //console.log(model);
  //renderEngine.editorControls.transformControls.attach(model);
  /*  fbxLoader.load(
    "models/Breakdance 1990.fbx",
    (object) => {
      const mixer = new THREE.AnimationMixer(object);

      mixer.clipAction(object.animations[1]).play();

      renderEngine.engine.registerBeforeRenderCallback((delta) => {
        mixer.update(delta / 1000);
      });

      object.scale.set(0.02, 0.02, 0.02);
      object.position.set(0, 0, 0);
      scene.add(object);
      sceneGraph.add(
        sceneGraph.root!.id,
        new SceneObject(
          "Base T Pose 2",
          object,
          api.SceneObjectType.MeshObject,
          true
        )
      );
    },
    (xhr) => {},
    (error) => {}
  ); */
  /* fbxLoader.load(
    "models/Breakdance 1990_without_skin.fbx",
    (object) => {
      const mixer = new THREE.AnimationMixer(model2);

       mixer.clipAction(object.animations[0]).play();

      renderEngine.engine.registerBeforeRenderCallback((delta) => {
        mixer.update(delta / 1000);
      });

      model2.scale.set(0.02, 0.02, 0.02);
      model2.position.set(3.5, 0, 0);
      scene.add(model2);
      sceneGraph.add(
        sceneGraph.root!.id,
        new SceneObject(
          "Base T Pose 3",
          model2,
          api.SceneObjectType.MeshObject,
          true
        )
      );
    },
    (xhr) => {},
    (error) => {}
  ); */
  //const apples = await fbxLoader.loadAsync("apples/t1.fbx");
  //scene.add(apples);
}
