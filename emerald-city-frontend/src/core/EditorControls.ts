import * as THREE from "three";
import { Engine } from "./Engine";
import { v4 as uuidv4 } from "uuid";
import { RenderEngine } from "./RenderEngine";
import {
  TransformControls,
  TransformControlsPlane,
} from "three/examples/jsm/controls/TransformControls";
import { SceneGraph } from "./SceneGraph";
import { MeshBasicMaterial } from "three";
//import { Key } from "ts-key-enum";

export interface KeyState {
  forward: boolean;
  left: boolean;
  backward: boolean;
  right: boolean;
  flyUp: boolean;
  flyDown: boolean;
}

export interface MouseMovement {
  movementX: number;
  movementY: number;
}

export type RaycastCallback = (
  intersects: THREE.Intersection<THREE.Object3D<THREE.Event>>[]
) => void;

export class EditorControls {
  camera: THREE.PerspectiveCamera;
  domElement: HTMLElement;
  renderEngine: RenderEngine;
  sceneGraph: SceneGraph;
  transformControls: TransformControls;
  lastSelectedObject: THREE.Object3D<THREE.Event> | null = null;

  forwardMovementSpeed: number = 0.35;
  backwardMovementSpeed: number = 0.35;
  leftMovementSpeed: number = 0.35;
  rightMovementSpeed: number = 0.35;
  flyUpMovementSpeed: number = 0.35;
  flyDownMovementSpeed: number = 0.35;
  mouseWheelZoomSpeed: number = 0.005;

  horizontalRotationSpeed: number = 0.001;
  verticalRotationSpeed: number = 0.001;

  toMoveForward: number = 0;
  toMoveRight: number = 0;
  toMoveJump: number = 0;
  toRotate: THREE.Vector2 = new THREE.Vector2(0, 0);

  raycastCallbacks: Map<string, RaycastCallback> = new Map<
    string,
    RaycastCallback
  >();

  raycaster = new THREE.Raycaster();
  willCastRays: boolean = true;
  pointer = new THREE.Vector2();

  keyState: KeyState = {
    forward: false,
    left: false,
    backward: false,
    right: false,
    flyUp: false,
    flyDown: false,
  };
  mouseMovement: MouseMovement = { movementX: 0, movementY: 0 };
  accumulatedWheelMovementY: number = 0;

  upVector: THREE.Vector3 = new THREE.Vector3(0.0, 1.0, 0.0);

  movementOn: boolean = false;

  constructor(
    renderEngine: RenderEngine,
    sceneGraph: SceneGraph,
    domElement: HTMLElement,
    camera: THREE.PerspectiveCamera
  ) {
    console.log("Controller attached");

    this.renderEngine = renderEngine;
    this.sceneGraph = sceneGraph;
    this.camera = camera;
    this.domElement = domElement;

    this.registerRaycastCallback((intersects) => {
      console.log(intersects);
      const intersection = intersects.find((intersection) => {
        if (
          intersection.object instanceof TransformControlsPlane ||
          intersection.object instanceof THREE.Line
        )
          return false;

        if (
          intersection.object instanceof THREE.Mesh &&
          intersection.object.material.opacity &&
          intersection.object.material.opacity < 0.49
        )
          return false;

        return true;
      });

      if (intersection === undefined) return;

      if (
        !this.sceneGraph.renderObjectToSceneObjectMap.has(
          intersection.object.uuid
        )
      )
        return;

      //console.log(intersection.object);

      const selectedSceneObject =
        this.sceneGraph.getSceneObjectFromRenderObjectID(
          intersection.object.uuid
        );

      if (selectedSceneObject!.isSelectable) {
        //this.transformControls.attach(intersection.object);
        this.transformControls.attach(selectedSceneObject!.renderObject);

        if (this.lastSelectedObject) {
          this.sceneGraph.getSceneObjectFromRenderObjectID(
            this.lastSelectedObject.uuid
          )!.isSelected = false;

          selectedSceneObject!.isSelected = true;

          //this.lastSelectedObject = intersection.object;
          this.lastSelectedObject = selectedSceneObject!.renderObject;
        }
      }
    });

    this.domElement.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.domElement.addEventListener("keyup", this.handleKeyUp.bind(this));
    this.domElement.addEventListener(
      "mousemove",
      this.handleMouseMove.bind(this)
    );
    this.domElement.addEventListener(
      "mouseenter",
      this.handleMouseEnter.bind(this)
    );
    this.domElement.addEventListener(
      "mouseleave",
      this.handleMouseLeave.bind(this)
    );
    this.domElement.addEventListener(
      "mousedown",
      this.handleMouseDown.bind(this)
    );
    this.domElement.addEventListener("mouseup", this.handleMouseUp.bind(this));
    this.domElement.addEventListener("wheel", this.handleMouseWheel.bind(this));

    this.transformControls = new TransformControls(
      this.camera,
      this.domElement
    );
    this.transformControls.setSpace("world");
    this.transformControls.setMode("translate");
    this.renderEngine.mainScene.add(this.transformControls);
  }

  moveForward(delta: number) {
    this.camera.translateZ(delta * -this.forwardMovementSpeed);
  }

  moveBackward(delta: number) {
    this.camera.translateZ(delta * this.backwardMovementSpeed);
  }

  moveRight(delta: number) {
    this.camera.translateX(delta * this.rightMovementSpeed);
  }

  moveLeft(delta: number) {
    this.camera.translateX(delta * -this.leftMovementSpeed);
  }

  moveUp(delta: number) {
    this.camera.translateY(delta * this.flyUpMovementSpeed);
  }

  moveDown(delta: number) {
    this.camera.translateY(delta * -this.flyDownMovementSpeed);
  }

  handleKeyDown(ev: KeyboardEvent) {
    if (this.movementOn)
      switch (ev.code) {
        case "KeyW":
          this.keyState.forward = true;
          break;
        case "KeyA":
          this.keyState.left = true;
          break;
        case "KeyS":
          this.keyState.backward = true;
          break;
        case "KeyD":
          this.keyState.right = true;
          break;
        case "Space":
          this.keyState.flyUp = true;
          break;
        case "KeyC":
          this.keyState.flyDown = true;
          break;
        default:
          break;
      }

    switch (ev.code) {
      case "KeyW":
        this.transformControls.setMode("translate");
        break;
      case "KeyE":
        this.transformControls.setMode("rotate");
        break;
      case "KeyR":
        this.transformControls.setMode("scale");
        break;
      case "NumpadAdd":
        this.transformControls.setSize(this.transformControls.size * 1.01);
        break;
      case "NumpadSubtract":
        this.transformControls.setSize(this.transformControls.size * 0.99);
        break;
      case "ShiftLeft":
      case "ShiftRight":
        this.transformControls.setTranslationSnap(1);
        this.transformControls.setRotationSnap(THREE.MathUtils.degToRad(15));
        this.transformControls.setScaleSnap(0.25);
        break;
      default:
        break;
    }
  }

  handleKeyUp(ev: KeyboardEvent) {
    switch (ev.code) {
      case "KeyW":
        this.keyState.forward = false;
        break;
      case "KeyA":
        this.keyState.left = false;
        break;
      case "KeyS":
        this.keyState.backward = false;
        break;
      case "KeyD":
        this.keyState.right = false;
        break;
      case "Space":
        this.keyState.flyUp = false;
        break;
      case "KeyC":
        this.keyState.flyDown = false;
        break;
      case "ShiftLeft":
      case "ShiftRight":
        this.transformControls.setTranslationSnap(null);
        this.transformControls.setRotationSnap(null);
        this.transformControls.setScaleSnap(null);
        break;
      default:
        break;
    }
  }

  handleMouseMove(ev: MouseEvent) {
    if (this.movementOn) {
      this.mouseMovement.movementX += ev.movementX;
      this.mouseMovement.movementY += ev.movementY;
    }
  }

  handleMouseEnter() {
    //console.log("mouse enter");
  }

  handleMouseLeave() {
    //console.log("mouse leave");
  }

  castRays(ev: MouseEvent) {
    this.pointer.x =
      (ev.offsetX / this.renderEngine.renderer.domElement.width) * 2 - 1;
    this.pointer.y =
      -(ev.offsetY / this.renderEngine.renderer.domElement.height) * 2 + 1;

    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(
      this.renderEngine.mainScene.children
    );

    if (intersects.length === 0) return;

    /*     const intersectedObjectIndex = intersects.findIndex((renderObject) => {
      return (
        this.sceneGraph.renderObjectToSceneObjectMap.get(
          renderObject.object.uuid
        ) !== undefined
      );
    });

    if (intersectedObjectIndex === -1) return;

    console.log(intersects); */

    this.raycastCallbacks.forEach((callback) => callback(intersects));
  }

  handleMouseDown(ev: MouseEvent) {
    if (ev.button === 2) {
      this.movementOn = true;
      this.domElement.requestPointerLock();
    } else if (this.castRays && ev.button === 0) {
      this.castRays(ev);
    }
  }

  handleMouseUp(ev: MouseEvent) {
    if (ev.button === 2) {
      this.movementOn = false;
      document.exitPointerLock();
    }
  }

  handleMouseWheel(ev: WheelEvent) {
    this.accumulatedWheelMovementY += ev.deltaY;
  }

  update(delta: number) {
    delta /= 32;
    if (this.keyState.forward) this.moveForward(delta);
    if (this.keyState.left) this.moveLeft(delta);
    if (this.keyState.backward) this.moveBackward(delta);
    if (this.keyState.right) this.moveRight(delta);
    if (this.keyState.flyUp) this.moveUp(delta);
    if (this.keyState.flyDown) this.moveDown(delta);

    this.camera.translateZ(
      this.accumulatedWheelMovementY * this.mouseWheelZoomSpeed
    );
    this.accumulatedWheelMovementY = 0;

    this.camera.rotateX(
      -this.verticalRotationSpeed * this.mouseMovement.movementY
    );

    this.camera.rotateOnWorldAxis(
      this.upVector,
      -this.horizontalRotationSpeed * this.mouseMovement.movementX
    );

    this.mouseMovement.movementX = 0;
    this.mouseMovement.movementY = 0;
  }

  registerRaycastCallback(callback: RaycastCallback): string {
    const id = uuidv4();
    this.raycastCallbacks.set(id, callback);
    return id;
  }

  removeRaycastCallback(id: string) {
    return this.raycastCallbacks.delete(id);
  }
}
