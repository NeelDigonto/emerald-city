import { api } from "@backend/types/api/Core";
import * as THREE from "three";
import { Object3D } from "three";
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

export function deepTraverse(
  object: Object3D<THREE.Event>,
  callback: (object: Object3D) => void
) {
  if (object.children.length === 0) callback(object);

  object.children.forEach((_object) => deepTraverse(_object, callback));
}

export function replaceMat(
  _object: Object3D<THREE.Event>,
  newMat: THREE.Material
) {
  deepTraverse(_object, (obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.material.dispose();
      obj.material = newMat;
    }
  });
}

export async function getPresignedDownloadUrl(fileRef: api.FileRef) {
  return await fetch("http://localhost:5000/get-presigned-get-url", {
    method: "POST",
    body: JSON.stringify({
      bucket: fileRef.bucket,
      key: fileRef.key,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.text());
}

export function createMesh(model: string) {}
