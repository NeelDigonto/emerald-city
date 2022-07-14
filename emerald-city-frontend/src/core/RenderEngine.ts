import { Engine } from "./Engine";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing//UnrealBloomPass";
import * as THREE from "three";
import { EditorControls } from "./EditorControls";

export class RenderEngine {
  // should always be attached
  container: HTMLDivElement;
  canvas: HTMLCanvasElement;
  engine: Engine;
  editorControls: EditorControls;

  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;

  isPlaying: boolean = false;
  mainScene: THREE.Scene = new THREE.Scene();
  width: number = 0;
  height: number = 0;
  delta: number = 0;
  lastFrameStartTimeStamp: number = 0;
  lastFrameRenderTime: number = 0;

  //renderPass: RenderPass | null = null;
  //renderScene!: RenderPass;
  //bloomPass?: UnrealBloomPass = null;
  //outlinePass: OutlinePass | null = null;
  //composer?: EffectComposer = null;

  constructor(
    engine: Engine,
    container: HTMLDivElement,
    canvas: HTMLCanvasElement
  ) {
    console.log("Render Engine Initialized");
    this.engine = engine;
    this.container = container;
    this.canvas = canvas;

    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.01,
      1000
    );

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x87ceeb, 1);
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;

    window.addEventListener("resize", this.resize.bind(this)); // on window?

    this.editorControls = new EditorControls(
      this,
      engine.sceneGraph,
      this.container,
      this.camera
    );
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;

    this.camera.updateProjectionMatrix();
  }

  render() {
    const timestamp = performance.now();
    this.delta = timestamp - this.lastFrameStartTimeStamp;

    this.renderer.render(this.mainScene, this.camera);

    this.lastFrameRenderTime = performance.now() - timestamp;
    this.lastFrameStartTimeStamp = timestamp;

    this.editorControls.update(this.delta);
  }
}
