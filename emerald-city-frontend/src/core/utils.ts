import * as api from "@backend/types/api/Core";
import { REST_API_URL } from "@src/Constants";
import * as THREE from "three";
import { Object3D } from "three";
import { SceneGraph, SceneObject } from "./SceneGraph";

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
    new SceneObject("Base T Pose 3", model2, api.SceneObjectType.MeshObject, true)
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
  return await fetch(`${REST_API_URL}/get-presigned-get-url`, {
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

export function generatePrimitiveMeshes() {
  const map = new Map<api.PrimitiveMesh, THREE.BufferGeometry>();

  map.set(api.PrimitiveMesh.Box, new THREE.BoxGeometry(1, 1, 1));

  map.set(api.PrimitiveMesh.Capsule, new THREE.CapsuleGeometry(0.5, 1, 20, 30));

  map.set(api.PrimitiveMesh.Circle, new THREE.CircleGeometry(1, 50));

  map.set(api.PrimitiveMesh.Cone, new THREE.ConeGeometry(0.5, 1, 40, 1));

  map.set(
    api.PrimitiveMesh.Cylinder,
    new THREE.CylinderGeometry(1, 1, 2, 50, 1)
  );

  map.set(api.PrimitiveMesh.Plane, new THREE.PlaneGeometry(1, 1));

  map.set(api.PrimitiveMesh.Ring, new THREE.RingGeometry(0.5, 1, 50, 1));

  map.set(api.PrimitiveMesh.Sphere, new THREE.SphereGeometry(1, 50, 25));

  map.set(api.PrimitiveMesh.Torus, new THREE.TorusGeometry(1, 0.25, 25, 50));

  return map;
}

export function toDBSceneObject(sceneObject: SceneObject) {
  const dbSceneObject: api.DBSceneObject = {
    id: sceneObject.id,
    name: sceneObject.name,
    isSelectable: sceneObject.isSelectable,
    isSelected: sceneObject.isSelected,
    type: sceneObject.type,
    childrens: [],

    modelID: sceneObject.modelID,
    lightID: sceneObject.lightID,

    localTransformation: sceneObject.renderObject.matrix.toArray(),
  };

  return dbSceneObject;
}

export function toSceneObject(dbSceneObject: api.DBSceneObject) {
  /*   const sceneObject: SceneObject = {
      id: dbSceneObject.id,
  name: dbSceneObject.name,
  type: dbSceneObject.type,
  isSelectable: dbSceneObject.isSelectable,
  isSelected:dbSceneObject.isSelected,
  renderObject: THREE.Object3D;
  parent: SceneObject;
  childrens: [],

  modelID?: string;
  lightID?: string;
  };

  return sceneObject; */
}
