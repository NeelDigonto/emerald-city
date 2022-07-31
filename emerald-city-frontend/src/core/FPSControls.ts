import { RenderEngine } from "./RenderEngine";
import { SceneGraph } from "./SceneGraph";
import * as THREE from "three";

interface KeyState {
  forward: boolean;
  left: boolean;
  backward: boolean;
  right: boolean;
}

interface MouseMovement {
  movementX: number;
  movementY: number;
}

export class FPSControls {
  camera: THREE.PerspectiveCamera;
  player: THREE.Object3D;
  domElement: HTMLElement;
  renderEngine: RenderEngine;

  enabled: boolean = false;

  forwardMovementSpeed: number = 0.35;
  backwardMovementSpeed: number = 0.35;
  leftMovementSpeed: number = 0.35;
  rightMovementSpeed: number = 0.35;

  horizontalRotationSpeed: number = 0.001;
  verticalRotationSpeed: number = 0.001;

  toMoveForward: number = 0;
  toMoveRight: number = 0;
  toMoveJump: number = 0;
  toRotate: THREE.Vector2 = new THREE.Vector2(0, 0);

  pointer = new THREE.Vector2();

  keyState: KeyState = {
    forward: false,
    left: false,
    backward: false,
    right: false,
  };
  mouseMovement: MouseMovement = { movementX: 0, movementY: 0 };

  upVector: THREE.Vector3 = new THREE.Vector3(0.0, 1.0, 0.0);

  constructor(
    renderEngine: RenderEngine,
    player: THREE.Object3D,
    domElement: HTMLElement,
    camera: THREE.PerspectiveCamera
  ) {
    console.log("Editor Controller attached");

    this.renderEngine = renderEngine;
    this.camera = camera;
    this.player = player;
    this.domElement = domElement;

    this.domElement.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.domElement.addEventListener("keyup", this.handleKeyUp.bind(this));
    this.domElement.addEventListener(
      "mousemove",
      this.handleMouseMove.bind(this)
    );

    this.domElement.addEventListener(
      "mousedown",
      this.handleMouseDown.bind(this)
    );
  }

  handleMouseDown(ev: MouseEvent) {
    if (!this.enabled) {
      //this.domElement.requestFullscreen();
      this.domElement.requestPointerLock();
      console.log("Pointer Locked");
      this.enabled = true;
    }
  }

  moveForward(delta: number) {
    this.camera.translateZ(delta * -this.forwardMovementSpeed);
    this.player.translateZ(delta * -this.forwardMovementSpeed);
  }

  moveBackward(delta: number) {
    this.camera.translateZ(delta * this.backwardMovementSpeed);
    this.player.translateZ(delta * this.backwardMovementSpeed);
  }

  moveRight(delta: number) {
    this.camera.translateX(delta * this.rightMovementSpeed);
    this.player.translateX(delta * this.rightMovementSpeed);
  }

  moveLeft(delta: number) {
    this.camera.translateX(delta * -this.leftMovementSpeed);
    this.player.translateX(delta * -this.leftMovementSpeed);
  }

  handleKeyDown(ev: KeyboardEvent) {
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
      default:
        break;
    }
  }

  handleKeyUp(ev: KeyboardEvent) {
    console.log(ev);
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
      default:
        break;
    }
  }

  handleMouseMove(ev: MouseEvent) {
    this.mouseMovement.movementX += ev.movementX;
    this.mouseMovement.movementY += ev.movementY;
  }

  update(delta: number) {
    delta /= 32;
    if (this.enabled) {
      if (this.keyState.forward) this.moveForward(delta);
      if (this.keyState.left) this.moveLeft(delta);
      if (this.keyState.backward) this.moveBackward(delta);
      if (this.keyState.right) this.moveRight(delta);

      this.camera.rotateX(
        -this.verticalRotationSpeed * this.mouseMovement.movementY
      );

      this.camera.rotateOnWorldAxis(
        this.upVector,
        -this.horizontalRotationSpeed * this.mouseMovement.movementX
      );

      this.player.rotateOnWorldAxis(
        this.upVector,
        -this.horizontalRotationSpeed * this.mouseMovement.movementX
      );

      this.mouseMovement.movementX = 0;
      this.mouseMovement.movementY = 0;
    }
  }
}
