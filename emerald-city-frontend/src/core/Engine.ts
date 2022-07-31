import * as THREE from "three";

import { setupScene } from "./scene/BaseScene";
import { EditorControls } from "./EditorControls";
import { SceneGraph, SceneObject } from "./SceneGraph";
import { RenderEngine } from "./RenderEngine";
import { v4 as uuidv4 } from "uuid";
import { NetworkEngine } from "./NetworkEngine";
import * as api from "@backend/types/api/Core";
import { fabClasses } from "@mui/material";
import { toDBSceneObject } from "./utils";
import { ensureModel } from "./SceneReconstruction";

export enum Role {
  Editor,
  Simulate,
}

type BeforeRenerCallback = (delta: DOMHighResTimeStamp) => void;
type OnRenderEngineInitializeCallback = () => void;

export enum EngineMode {
  None = "None",
  Editor = "Editor",
  Playground = "Playground",
}

export class Engine {
  //renderEngine
  //scenegrpah
  //audioengine
  //physics engine
  //networkhandler

  delta: number = 0;
  lastLoopStartTimeStamp: number = 0;
  lastLoopTime: number = 0;
  mode: EngineMode;
  isBaseSceneInitialized: boolean = false;
  isSceneGraphInitialized: boolean = false;

  onRenderEngineInitializeCallbacks: Map<
    string,
    OnRenderEngineInitializeCallback
  > = new Map<string, OnRenderEngineInitializeCallback>();

  beforeRenderCallbacks: Map<string, BeforeRenerCallback> = new Map<
    string,
    BeforeRenerCallback
  >();

  players: Map<string, api.ClientPlayerData> = new Map<
    string,
    api.ClientPlayerData
  >();

  sceneGraph: SceneGraph;
  renderEngine: RenderEngine | null = null;
  networkEngine: NetworkEngine | null = null;
  currentRole: Role;

  constructor() {
    console.log("Engine Loaded");
    this.mode = EngineMode.None;
    this.currentRole = Role.Editor;
    this.sceneGraph = new SceneGraph(this);
  }

  setEngineMode(mode: EngineMode) {
    this.mode = mode;
  }

  initializeRenderEngine(container: HTMLDivElement, canvas: HTMLCanvasElement) {
    this.renderEngine = new RenderEngine(this, container, canvas);

    this.sceneGraph.setRootObject({
      id: uuidv4(),

      name: "Level Editor",
      type: api.SceneObjectType.Level,
      isSelectable: false,
      isSelected: false,
      renderObject: this.renderEngine.mainScene,
      parent: this.sceneGraph.root!,
      childrens: [],
    });

    this.onRenderEngineInitializeCallbacks.forEach((callbackfn) =>
      callbackfn()
    );
  }

  setupBaseScene() {
    setupScene(
      this.renderEngine!.mainScene,
      this.renderEngine!.camera,
      this.sceneGraph,
      this.renderEngine!
    )
      .then(() => (this.isBaseSceneInitialized = true))
      .then(() =>
        fetch("http://localhost:5000/sceneGraph/get")
          .then((response) => response.json())

          .then((dbSceneObject) => {
            if (dbSceneObject && dbSceneObject !== undefined)
              this.reconstructSceneGraph(dbSceneObject.sceneGraph);
          })
      )
      .then(() => (this.isSceneGraphInitialized = true))
      .then(() => {
        if (this.mode === EngineMode.Editor) {
          const id = setInterval(() => {
            const sceneGraph = this.serializeSceneGraph();

            fetch("http://localhost:5000/sceneGraph/update", {
              method: "POST",
              body: JSON.stringify(sceneGraph),
              headers: {
                "Content-Type": "application/json",
              },
            });
          }, 5000);
        }
      });
  }

  serializeSceneGraph(): api.DBSceneObject {
    const root = this.sceneGraph.root!;
    const dbSceneObject: api.DBSceneObject = toDBSceneObject(root);

    root.childrens.forEach((obj) => {
      dbSceneObject.childrens.push(toDBSceneObject(obj));
    });

    return dbSceneObject;
  }

  async reconstructSceneGraph(rootSceneObject: api.DBSceneObject) {
    return Promise.all(
      rootSceneObject.childrens.map(async (dbSceneObject) => {
        switch (dbSceneObject.type) {
          case api.SceneObjectType.ImportedMeshModel:
          case api.SceneObjectType.PrimitiveMeshModel: {
            await ensureModel(this.renderEngine!, dbSceneObject.modelID!);
            const renderObject = this.renderEngine?.modelStore.get(
              dbSceneObject.modelID!
            )!;

            renderObject.applyMatrix4(
              new THREE.Matrix4().fromArray(dbSceneObject.localTransformation)
            );

            this.renderEngine?.mainScene.add(renderObject);

            this.sceneGraph.add(this.sceneGraph.root!.id, {
              id: dbSceneObject.id,
              name: dbSceneObject.name,
              type: dbSceneObject.type,
              isSelectable: dbSceneObject.isSelectable,
              isSelected: dbSceneObject.isSelected,
              renderObject: renderObject,
              parent: this.sceneGraph.root!,
              childrens: [],

              modelID: dbSceneObject.modelID,
              lightID: dbSceneObject.lightID,
            });
            break;
          }
          default:
            break;
        }
      })
    );
  }

  initializeNetworkEngine() {
    //this.networkEngine = new NetworkEngine(this);
  }

  registerPlayer(playerData: api.ClientPlayerData) {
    this.players.set(playerData.playerID, playerData);
  }

  deRegisterPlayer(playerID: string) {
    this.players.delete(playerID);
  }

  setPlayerState(playerID: string, playerState: api.PlayerState) {
    this.players.get(playerID)!.playerState = playerState;
  }

  registerOnRenderEngineInitializeCallback(
    callbackfn: OnRenderEngineInitializeCallback
  ) {
    const id = uuidv4();
    this.onRenderEngineInitializeCallbacks.set(id, callbackfn);
    return id;
  }

  play() {
    requestAnimationFrame(this.update.bind(this));
  }

  registerBeforeRenderCallback(callbackfn: BeforeRenerCallback) {
    const id = uuidv4();
    this.beforeRenderCallbacks.set(id, callbackfn);
    return id;
  }

  update() {
    if (this.renderEngine === null)
      throw new Error("Render Engine uninitialized");

    const timestamp = performance.now();
    this.delta = timestamp - this.lastLoopStartTimeStamp;

    this.beforeRenderCallbacks.forEach((callbackfn) => callbackfn(this.delta));

    this.renderEngine.render();

    this.lastLoopTime = performance.now() - timestamp;
    this.lastLoopStartTimeStamp = timestamp;

    requestAnimationFrame(this.update.bind(this));
  }
}

/*     const size = this.renderer.getSize(new THREE.Vector2());
    const _pixelRatio = this.renderer.getPixelRatio();
    const _width = size.width;
    const _height = size.height;
    const renderTarget = new THREE.WebGLRenderTarget(
      _width * _pixelRatio,
      _height * _pixelRatio,
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        encoding: THREE.sRGBEncoding,
      }
    );
    renderTarget.texture.name = "EffectComposer.rt1"; 

//this.composer = new EffectComposer(this.renderer, renderTarget);

//this.renderPass = new RenderPass(this.scene, this.camera);
//this.composer.addPass(this.renderPass);

 this.outlinePass = new OutlinePass(
      new THREE.Vector2(this.canvas.width, this.canvas.height),
      this.scene,
      this.camera
    ); 
//this.composer.addPass(this.outlinePass);
//this.composer.
*/
