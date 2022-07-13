import * as THREE from "three";
import { Engine } from "./Engine";
import { v4 as uuidv4 } from "uuid";
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

export class EditorControls {
  camera: THREE.PerspectiveCamera;
  domElement: HTMLElement;
  engine: Engine;

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

  raycastCallbacks: Map<
    string,
    (intersectedObject: THREE.Object3D | null) => void
  > = new Map<string, (intersectedObject: THREE.Object3D | null) => void>();

  raycaster = new THREE.Raycaster();
  castRays: boolean = true;
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

  constructor(engine: Engine) {
    console.log("Controller attached");

    this.camera = engine.camera;
    if (!engine.renderer) throw new Error("Renderer not present in Engine");
    this.engine = engine;
    this.domElement = engine.renderer.domElement;

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
  }

  /*     const direction = new THREE.Vector3();
    this.camera.getWorldDirection(direction);
    this.camera.position.addScaledVector(direction, multiplier); */
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
      default:
        break;
    }
  }

  handleMouseMove(ev: MouseEvent) {
    if (this.movementOn) {
      this.mouseMovement.movementX += ev.movementX;
      this.mouseMovement.movementY += ev.movementY;
    }
    if (this.castRays && ev.button === 0) {
      this.pointer.x =
        (ev.offsetX / this.engine.renderer!.domElement.width) * 2 - 1;
      this.pointer.y =
        -(ev.offsetY / this.engine.renderer!.domElement.height) * 2 + 1;

      this.raycaster.setFromCamera(this.pointer, this.camera);
      const intersects = this.raycaster.intersectObjects(
        this.engine.scene.children
      );

      const intersectedObject =
        intersects.length === 0 ? null : intersects[0].object;

      this.raycastCallbacks.forEach((callback) => callback(intersectedObject));
    }
  }

  handleMouseEnter() {
    //console.log("mouse enter");
  }

  handleMouseLeave() {
    //console.log("mouse leave");
  }

  handleMouseDown(ev: MouseEvent) {
    if (ev.button === 2) {
      this.movementOn = true;
      this.domElement.requestPointerLock();
    } else if (this.castRays && ev.button === 0) {
      this.pointer.x =
        (ev.offsetX / this.engine.renderer!.domElement.width) * 2 - 1;
      this.pointer.y =
        -(ev.offsetY / this.engine.renderer!.domElement.height) * 2 + 1;

      this.raycaster.setFromCamera(this.pointer, this.camera);
      const intersects = this.raycaster.intersectObjects(
        this.engine.scene.children
      );

      const intersectedObject =
        intersects.length === 0 ? null : intersects[0].object;

      this.raycastCallbacks.forEach((callback) => callback(intersectedObject));
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

  registerRaycastCallback(
    callback: (intersectedObject: THREE.Object3D | null) => void
  ): string {
    const id = uuidv4();
    this.raycastCallbacks.set(id, callback);
    return id;
  }

  removeRaycastCallback(id: string) {
    return this.raycastCallbacks.delete(id);
  }
}
