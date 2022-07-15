import * as THREE from "three";

import { setupScene } from "./scene/BaseScene";
import { EditorControls } from "./EditorControls";
import { SceneGraph, SceneObject, SceneObjectType } from "./SceneGraph";
import { RenderEngine } from "./RenderEngine";

export enum Role {
  Editor,
  Simulate,
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

  sceneGraph: SceneGraph;
  renderEngine: RenderEngine | null = null;
  currentRole: Role;

  constructor() {
    console.log("Engine Loaded");
    this.currentRole = Role.Editor;
    this.sceneGraph = new SceneGraph(this);
  }

  initializeRenderEngine(container: HTMLDivElement, canvas: HTMLCanvasElement) {
    this.renderEngine = new RenderEngine(this, container, canvas);
    this.sceneGraph.setRootObject(
      new SceneObject(
        "Level Editor",
        this.renderEngine.mainScene,
        SceneObjectType.Level,
        false
      )
    );
  }

  play() {
    requestAnimationFrame(this.update.bind(this));
  }

  update() {
    if (this.renderEngine === null)
      throw new Error("Render Engine uninitialized");

    const timestamp = performance.now();
    this.delta = timestamp - this.lastLoopStartTimeStamp;

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
