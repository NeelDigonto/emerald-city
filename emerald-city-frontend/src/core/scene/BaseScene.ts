import * as THREE from "three";
import { Engine } from "@src/core/Engine";

export async function setupScene(engine: Engine): Promise<void> {
  /*       const loader = new THREE.TextureLoader();
      const albedoMap = await loader.loadAsync(
        "/pavement_pebbles_sfiubccb/1k/sfiubccb_1K_Albedo.jpg"
      );
      console.log(albedoMap); */

  const width = 100; // ui: width
  const height = 100; // ui: height
  const geometry = new THREE.PlaneGeometry(width, height);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x00ff00,
    //map: albedoMap,
  });
  const light = new THREE.PointLight(0xffffff, 50);
  light.position.set(10, 10, 10);
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, 0, 0);
  engine.scene.add(cube);
  engine.scene.add(light);

  engine.camera.position.set(0, -10, 5);
  //this.camera.updateMatrix();


}
