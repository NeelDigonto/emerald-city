import { Engine } from "./Engine";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing//UnrealBloomPass";
import * as THREE from "three";
import { EditorControls } from "./EditorControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { api } from "@backend/types/api/Core";
import { store } from "@src/app/store";
import { generatePrimitiveMeshes, getPresignedDownloadUrl } from "./utils";

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

  textureStore: Map<string, THREE.Texture> = new Map<string, THREE.Texture>();
  materialStore: Map<string, THREE.Material> = new Map<
    string,
    THREE.Material
  >();
  importedMeshStore: Map<string, THREE.Object3D> = new Map<
    string,
    THREE.Object3D
  >();
  primitiveMeshStore: Map<api.PrimitiveMesh, THREE.BufferGeometry>;
  modelStore: Map<string, THREE.Object3D> = new Map<string, THREE.Object3D>();

  textureLoader: THREE.TextureLoader = new THREE.TextureLoader();
  fbxLoader: FBXLoader = new FBXLoader();

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
    this.renderer.shadowMap.enabled = true;
    this.renderer.toneMappingExposure = 0.8;

    window.addEventListener("resize", this.resize.bind(this)); // on window?

    this.editorControls = new EditorControls(
      this,
      engine.sceneGraph,
      this.container,
      this.camera
    );

    this.primitiveMeshStore = generatePrimitiveMeshes();
  }

  async ensureMaterial(materialID: string) {
    if (this.materialStore.has(materialID)) return;

    const state = store.getState();
    const _material = state.material.find((mat) => mat.id === materialID)!;

    let material: THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial;
    if (_material.type === api.MaterialType.Standard)
      material = new THREE.MeshStandardMaterial();
    else if (_material.type === api.MaterialType.Physical)
      material = new THREE.MeshPhysicalMaterial();
    else {
      material = new THREE.MeshStandardMaterial();
    }

    //_material.baseColor

    const texturePack = state.texturePack.find(
      (atexturePack) => atexturePack.id === _material.texturePackID
    )!;

    if (texturePack.pmaaaoCompressed !== undefined) {
      if (!this.textureStore.has(texturePack.pmaaaoCompressed.fuuid)) {
        const tex = await this.textureLoader.loadAsync(
          await getPresignedDownloadUrl(texturePack.pmaaaoCompressed)
        );
        tex.encoding = THREE.sRGBEncoding;
        this.textureStore.set(texturePack.pmaaaoCompressed.fuuid, tex);
        material.map = tex;
      }
    } else if (texturePack.albedoCompressed !== undefined) {
      if (!this.textureStore.has(texturePack.albedoCompressed.fuuid)) {
        const tex = await this.textureLoader.loadAsync(
          await getPresignedDownloadUrl(texturePack.albedoCompressed)
        );
        tex.encoding = THREE.sRGBEncoding;
        this.textureStore.set(texturePack.albedoCompressed.fuuid, tex);
        material.map = tex;
      }
    }

    if (texturePack.normalCompressed !== undefined) {
      if (!this.textureStore.has(texturePack.normalCompressed.fuuid)) {
        const tex = await this.textureLoader.loadAsync(
          await getPresignedDownloadUrl(texturePack.normalCompressed)
        );
        this.textureStore.set(texturePack.normalCompressed.fuuid, tex);
        material.normalMap = tex;
      }
    }

    if (texturePack.roughnessCompressed !== undefined) {
      if (!this.textureStore.has(texturePack.roughnessCompressed.fuuid)) {
        const tex = await this.textureLoader.loadAsync(
          await getPresignedDownloadUrl(texturePack.roughnessCompressed)
        );
        this.textureStore.set(texturePack.roughnessCompressed.fuuid, tex);
        material.roughnessMap = tex;
      }
    }

    if (texturePack.metalnessCompressed !== undefined) {
      if (!this.textureStore.has(texturePack.metalnessCompressed.fuuid)) {
        const tex = await this.textureLoader.loadAsync(
          await getPresignedDownloadUrl(texturePack.metalnessCompressed)
        );
        this.textureStore.set(texturePack.metalnessCompressed.fuuid, tex);
        material.metalnessMap = tex;
      }
    }

    this.materialStore.set(_material.id, material);
  }

  async ensureImportedMesh(importedMeshID: string) {
    if (this.importedMeshStore.has(importedMeshID)) return;

    const importedMeshes = store.getState().importedMeshes;

    const importedMeshFileRef = importedMeshes.find(
      (importedMesh) => importedMesh.id === importedMeshID
    )!.file;

    this.importedMeshStore.set(
      importedMeshID,
      await this.fbxLoader.loadAsync(
        await getPresignedDownloadUrl(importedMeshFileRef)
      )
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
