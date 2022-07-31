import * as THREE from "three";
import { Engine } from "./Engine";
import { v4 as uuidv4 } from "uuid";
import * as api from "@backend/types/api/Core";
import { store } from "@src/app/store";

export interface SceneObject {
  id: string;
  name: string;
  type: api.SceneObjectType;
  isSelectable: boolean;
  isSelected: boolean;
  renderObject: THREE.Object3D;
  parent: SceneObject;
  childrens: SceneObject[];

  modelID?: string;
  lightID?: string;
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

  remove(sceneObject: SceneObject) {
    sceneObject.renderObject.traverse((subObj) =>
      this.renderObjectToSceneObjectMap.delete(subObj.uuid)
    );

    sceneObject.renderObject.removeFromParent();

    const result = this.objectCache.delete(sceneObject.id);

    const deleteID = sceneObject.id;

    let parent = sceneObject.parent;

    parent.childrens = parent.childrens.filter(
      (_sceneObject) => _sceneObject.id !== deleteID
    );

    this.onChangeCallbacks.forEach((callback) => callback());
    return result;
  }

  duplicateSceneObject(sceneObject: SceneObject) {
    console.log(sceneObject);

    if (
      sceneObject.type === api.SceneObjectType.ImportedMeshModel ||
      sceneObject.type === api.SceneObjectType.PrimitiveMeshModel
    ) {
      const parent = sceneObject.parent;

      const dbModel = store
        .getState()
        .model.find((model) => model.id === sceneObject.modelID!)!;
      const newDBMaodel: api.Optional<api.Model, "id"> = { ...dbModel };

      delete newDBMaodel.id;
    }
  }
}
