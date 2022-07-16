import * as THREE from "three";
import { SceneGraph } from "./SceneGraph";

export function requestUnThrottledAnimationFrame(
  callback: (timestamp: DOMHighResTimeStamp) => void
) {
  callback(window.performance.now());
}

export function addDeepObjectToSceneGraph(
  sceneGraph: SceneGraph,
  parent: THREE.Object3D,
  object: THREE.Object3D
) {
  /*   sceneGraph.add(
    parent,
    new SceneObject("Base T Pose 3", model2, SceneObjectType.MeshObject, true)
  ); */
}

/* export function removeObject3D(object3D: any) {
  if (!(object3D instanceof THREE.Object3D)) return false;

  // for better memory management and performance
  if ("geometry" in object3D) object3D.geometry.dispose();

  if (object3D.material) {
    if (object3D.material instanceof Array) {
      // for better memory management and performance
      object3D.material.forEach((material) => material.dispose());
    } else {
      // for better memory management and performance
      object3D.material.dispose();
    }
  }
  object3D.removeFromParent(); // the parent might be the scene or another Object3D, but it is sure to be removed this way
  return true;
}
 */
