import * as THREE from "three";
import { Engine } from "./Engine";
import { v4 as uuidv4 } from "uuid";

export enum SceneObjectType {
  Level,
  MeshObject,
  Camera,
  Light,
}

export class SceneObject {
  id: string;
  name: string;
  type: SceneObjectType;
  renderObject: THREE.Object3D;
  childrens: SceneObject[];

  constructor(
    name: string,
    renderObject: THREE.Object3D,
    type: SceneObjectType
  ) {
    this.id = uuidv4();
    this.name = name;
    this.type = type;
    this.renderObject = renderObject;
    this.childrens = [];
  }
}

export class SceneGraph {
  objectCache: Map<string, SceneObject>;
  root: SceneObject | null;
  engine: Engine;
  onChangeCallbacks: Map<string, () => void>;

  constructor(engine: Engine) {
    this.objectCache = new Map();
    this.root = null;
    this.engine = engine;
    this.onChangeCallbacks = new Map<string, () => void>();
    console.warn("Scene Graph Initialized");
  }

  registerOnChangeCallback(callback: () => void) {
    //console.log("registerOnChangeCallback() with ", callback);
    const callbackID = uuidv4();
    this.onChangeCallbacks.set(callbackID, callback);
    return callbackID;
  }

  removeOnChangeCallback(callbackID: string) {
    //console.log("removeOnChangeCallback() with ", callbackID);
    this.onChangeCallbacks.delete(callbackID);
  }

  setRootObject(sceneObject: SceneObject): 0 {
    //sceneObject.id = "root";
    this.objectCache.clear();
    this.root = sceneObject;
    this.objectCache.set(sceneObject.id, sceneObject);
    return 0;
  }

  add(parentObjectID: string, object: SceneObject): string {
    //console.log("Hi: ", this.onChangeCallbacks);
    const id = object.id;
    this.objectCache.set(id, object);
    this.getSceneObjectByID(parentObjectID)?.childrens.push(object);
    this.onChangeCallbacks.forEach((callback) => callback());
    return id;
  }

  getSceneObjectByID(objectID: string) {
    return this.objectCache.get(objectID);
  }

  /*   remove(objectID: number) {
    const result = this.objectCache.delete(objectID);
    this.onChangeCallbacks.forEach((callback) => callback());
    return result;
  } */
}
