import { Engine } from "@src/core/Engine";

//export {};

declare global {
  interface Window {
    engine: Engine;
  }
}
