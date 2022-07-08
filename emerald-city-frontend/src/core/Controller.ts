import * as THREE from "three";
//import { Key } from "ts-key-enum";

export class Controller {
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

  constructor(camera: THREE.PerspectiveCamera, domElement: HTMLElement) {
    this.camera = camera;
    this.domElement = domElement;

    this.forwardMovementSpeed = 0.1;
    this.backwardMovementSpeed = 0.1;
    this.leftMovementSpeed = 0.1;
    this.rightMovementSpeed = 0.1;
    this.jumpMovementSpeed = 0.1;

    this.horizontalRotationSpeed = 0.001;
    this.verticalRotationSpeed = 0.001;

    this.toMoveForward = 0;
    this.toMoveRight = 0;
    this.toMoveJump = 0;
    this.toRotate = new THREE.Vector2(0, 0);

    this.domElement.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.domElement.addEventListener("keyup", this.handleKeyUp.bind(this));
    this.domElement.addEventListener(
      "mousemove",
      this.handleMouseMove.bind(this)
    );
    this.domElement.addEventListener(
      "mouseenter",
      this.handleMouseMove.bind(this)
    );
    this.domElement.addEventListener(
      "mouseleave",
      this.handleMouseMove.bind(this)
    );
    this.domElement.addEventListener(
      "mousemove",
      this.handleMouseMove.bind(this)
    );
  }

  moveForward(multiplier: number) {
    /*     const direction = new THREE.Vector3();
    this.camera.getWorldDirection(direction);
    this.camera.position.addScaledVector(direction, multiplier); */
    this.camera.translateZ(multiplier);
  }

  moveRight(multiplier: number) {
    /* const direction = new THREE.Vector3();
    this.camera.getWorldDirection(direction);
    this.camera.position.addScaledVector(direction, multiplier); */
    this.camera.translateX(multiplier);
  }

  moveUp(multiplier: number) {
    /* const direction = new THREE.Vector3();
    this.camera.getWorldDirection(direction);
    this.camera.position.addScaledVector(direction, multiplier); */
    this.camera.translateY(multiplier);
  }

  handleKeyDown(ev: KeyboardEvent) {
    switch (ev.code) {
      case "KeyW":
        this.moveForward(-this.forwardMovementSpeed);
        break;
      case "KeyA":
        this.moveRight(-this.leftMovementSpeed);
        break;
      case "KeyS":
        this.moveForward(this.backwardMovementSpeed);
        break;
      case "KeyD":
        this.moveRight(this.rightMovementSpeed);
        break;
      case "Space":
        this.moveUp(this.jumpMovementSpeed);
        break;
      case "Tab":
        (document.activeElement! as HTMLElement).blur();
        break;
      default:
        break;
    }
  }

  handleKeyUp(ev: KeyboardEvent) {
    switch (ev.code) {
      case "KeyW":
        break;
      case "KeyA":
        break;
      case "KeyS":
        break;
      case "KeyD":
        break;
      default:
        break;
    }
  }

  handleMouseMove(ev: MouseEvent) {
    this.camera.rotateY(-this.horizontalRotationSpeed * ev.movementX);
    this.camera.rotateX(-this.verticalRotationSpeed * ev.movementY);
  }

  handleMouseEnter() {
    console.log("mouse enter");
  }

  handleMouseLeave() {
    console.log("mouse leave");
  }

  update(delta: number) {}
}
