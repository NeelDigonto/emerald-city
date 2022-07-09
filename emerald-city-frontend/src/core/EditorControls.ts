import * as THREE from "three";
//import { Key } from "ts-key-enum";

export interface KeyState {
  forward: boolean;
  left: boolean;
  backward: boolean;
  right: boolean;
  jump: boolean;
}

export interface MouseMovement {
  movementX: number;
  movementY: number;
}

export class EditorControls {
  camera: THREE.PerspectiveCamera;
  domElement: HTMLElement;

  forwardMovementSpeed: number;
  backwardMovementSpeed: number;
  leftMovementSpeed: number;
  rightMovementSpeed: number;
  jumpMovementSpeed: number;

  horizontalRotationSpeed: number;
  verticalRotationSpeed: number;

  toMoveForward: number;
  toMoveRight: number;
  toMoveJump: number;
  toRotate: THREE.Vector2;

  keyState: KeyState;
  mouseMovement: MouseMovement;

  tmpQuaternion: THREE.Quaternion;

  movementOn: boolean;

  constructor(camera: THREE.PerspectiveCamera, domElement: HTMLElement) {
    console.log("Controller attached");

    this.camera = camera;
    this.domElement = domElement;

    this.forwardMovementSpeed = 0.25;
    this.backwardMovementSpeed = 0.25;
    this.leftMovementSpeed = 0.25;
    this.rightMovementSpeed = 0.25;
    this.jumpMovementSpeed = 0.25;

    this.horizontalRotationSpeed = 0.001;
    this.verticalRotationSpeed = 0.001;

    this.toMoveForward = 0;
    this.toMoveRight = 0;
    this.toMoveJump = 0;

    this.toRotate = new THREE.Vector2(0, 0);
    this.movementOn = false;
    this.keyState = {
      forward: false,
      left: false,
      backward: false,
      right: false,
      jump: false,
    };
    this.mouseMovement = { movementX: 0, movementY: 0 };

    this.tmpQuaternion = new THREE.Quaternion();

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
    this.camera.translateY(delta * this.jumpMovementSpeed);
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
          this.keyState.jump = true;
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
        this.keyState.jump = false;
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

  handleMouseDown(ev: MouseEvent) {
    if (ev.button === 2) {
      this.movementOn = true;
      this.domElement.requestPointerLock();
    }
  }

  handleMouseUp(ev: MouseEvent) {
    if (ev.button === 2) {
      this.movementOn = false;
      document.exitPointerLock();
    }
  }

  update(delta: number) {
    //    if (this.movementOn) {
    if (this.keyState.forward) this.moveForward(delta);
    if (this.keyState.left) this.moveLeft(delta);
    if (this.keyState.backward) this.moveBackward(delta);
    if (this.keyState.right) this.moveRight(delta);
    if (this.keyState.jump) this.moveUp(delta);
    //}

    /*     this.camera.rotateY(
      -this.horizontalRotationSpeed * this.mouseMovement.movementX
    );
    this.camera.rotateX(
      -this.verticalRotationSpeed * this.mouseMovement.movementY
    ); */

    /*     this.tmpQuaternion
      .set(
        -this.verticalRotationSpeed * this.mouseMovement.movementY,
        -this.horizontalRotationSpeed * this.mouseMovement.movementX,
        0,
        1
      )
      .normalize();
    this.camera.quaternion.multiply(this.tmpQuaternion); */
    this.camera.rotateX(
      -this.verticalRotationSpeed * this.mouseMovement.movementY
    );

    this.camera.rotateOnWorldAxis(
      new THREE.Vector3(0.0, 1.0, 0.0),
      -this.horizontalRotationSpeed * this.mouseMovement.movementX
    );

    /*     this.camera.rotateOnWorldAxis(
      new THREE.Vector3(1, 0, 0),
      -this.verticalRotationSpeed * this.mouseMovement.movementY
    );

    this.camera.rotateOnWorldAxis(
      new THREE.Vector3(0, 1, 0),
      -this.horizontalRotationSpeed * this.mouseMovement.movementX
    ); */

    this.mouseMovement.movementX = 0;
    this.mouseMovement.movementY = 0;
  }
}
