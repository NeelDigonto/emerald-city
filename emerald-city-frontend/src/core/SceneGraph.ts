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
  isSelected: boolean = false;
  isSelectable: boolean = true;
  type: SceneObjectType;
  renderObject: THREE.Object3D;
  childrens: SceneObject[];

  constructor(
    name: string,
    renderObject: THREE.Object3D,
    type: SceneObjectType,
    isSelectable: boolean
  ) {
    this.id = uuidv4();
    this.name = name;
    this.type = type;
    this.isSelectable = isSelectable;
    this.renderObject = renderObject;
    this.childrens = [];
  }
}

export class SceneGraph {
  objectCache: Map<string, SceneObject>;
  renderObjectToSceneObjectMap: Map<string, SceneObject> = new Map<
    string,
    SceneObject
  >();
  root: SceneObject | null;
  engine: Engine;
  onChangeCallbacks: Map<string, () => void>;

  constructor(engine: Engine) {
    console.warn("Scene Graph Loaded");
    this.objectCache = new Map();
    this.root = null;
    this.engine = engine;
    this.onChangeCallbacks = new Map<string, () => void>();
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
    //console.log(this, parentObjectID, object, this.onChangeCallbacks);
    const id = object.id;
    this.objectCache.set(id, object);
    //this.renderObjectToSceneObjectMap.set(object.renderObject.uuid, object);
    object.renderObject.traverse((child) => {
      this.renderObjectToSceneObjectMap.set(child.uuid, object);
    });
    this.getSceneObjectByID(parentObjectID)?.childrens.push(object);
    this.onChangeCallbacks.forEach((callback) => callback());
    return id;
  }

  getSceneObjectByID(objectID: string) {
    return this.objectCache.get(objectID);
  }

  getSceneObjectFromRenderObjectID(renderObjectID: string) {
    return this.renderObjectToSceneObjectMap.get(renderObjectID);
  }

  /*   remove(objectID: number) {
    const result = this.objectCache.delete(objectID);
    this.onChangeCallbacks.forEach((callback) => callback());
    return result;
  } */
}
