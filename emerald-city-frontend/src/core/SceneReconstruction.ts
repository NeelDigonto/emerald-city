import { store } from "@src/app/store";
import { getPresignedDownloadUrl, replaceMat } from "./utils";
import * as THREE from "three";
import { RenderEngine } from "./RenderEngine";
import * as api from "@backend/types/api/Core";

export async function ensureModel(renderEngine: RenderEngine, modelID: string) {
  if (modelID === undefined || modelID === "") return;
  if (renderEngine.modelStore.has(modelID)) return;

  const model = store.getState().model.find((model) => model.id === modelID)!;

  await ensureMaterial(renderEngine, model.materialID);

  if (model.type === api.ModelType.Basic) {
    const mesh = renderEngine.primitiveMeshStore
      .get(model.primitiveMeshType!)!
      .clone();

    console.log("mesh", mesh);

    const renderObject = new THREE.Mesh(
      mesh,
      renderEngine.materialStore.get(model.materialID)!.clone()
    );

    //console.log("renderObject", renderObject);

    renderEngine.modelStore.set(model.id, renderObject);
  } else if (model.type === api.ModelType.Imported) {
    await ensureImportedMesh(renderEngine, model.importedMeshID!);

    const importedMeshRef = renderEngine.importedMeshStore.get(
      model.importedMeshID!
    )!;

    //console.log("imported mesh", importedMeshRef);

    const _model = importedMeshRef.clone();

    if (model.materialID !== undefined || model.materialID !== "") {
      const matRef = renderEngine.materialStore.get(model.materialID!)!;

      //console.log("mat", matRef);

      replaceMat(_model, matRef.clone());
    }

    renderEngine.modelStore.set(model.id, _model);
  }
}

export async function ensureImportedMesh(
  renderEngine: RenderEngine,
  importedMeshID: string
) {
  if (importedMeshID === undefined || importedMeshID === "") return;
  if (renderEngine.importedMeshStore.has(importedMeshID)) return;

  const importedMeshes = store.getState().importedMeshes;

  const importedMeshFileRef = importedMeshes.find(
    (importedMesh) => importedMesh.id === importedMeshID
  )!.file;

  renderEngine.importedMeshStore.set(
    importedMeshID,
    await renderEngine.fbxLoader.loadAsync(
      await getPresignedDownloadUrl(importedMeshFileRef)
    )
  );
}

export async function ensureMaterial(
  renderEngine: RenderEngine,
  materialID: string
) {
  if (materialID === undefined || materialID === "") return;
  if (renderEngine.materialStore.has(materialID)) return;

  const state = store.getState();
  const _material = state.material.find((mat) => mat.id === materialID)!;

  //console.log("_material", _material);

  let material: THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial;
  if (_material.type === api.MaterialType.Standard)
    material = new THREE.MeshStandardMaterial();
  else if (_material.type === api.MaterialType.Physical)
    material = new THREE.MeshPhysicalMaterial();
  else {
    material = new THREE.MeshStandardMaterial();
  }

  material.color = new THREE.Color(_material.baseColor);
  material.roughness = _material.roughness;
  material.metalness = _material.metalness;

  const texturePack = state.texturePack.find(
    (atexturePack) => atexturePack.id === _material.texturePackID
  )!;

  //console.log("texturePack", texturePack);

  if (texturePack === undefined) {
    renderEngine.materialStore.set(_material.id, material);
    return;
  }

  if (texturePack.pmaaaoCompressed !== undefined) {
    if (!renderEngine.textureStore.has(texturePack.pmaaaoCompressed.fuuid)) {
      const tex = await renderEngine.textureLoader.loadAsync(
        await getPresignedDownloadUrl(texturePack.pmaaaoCompressed)
      );
      tex.encoding = THREE.sRGBEncoding;
      renderEngine.textureStore.set(texturePack.pmaaaoCompressed.fuuid, tex);
      material.map = tex;
    }
  } else if (texturePack.albedoCompressed !== undefined) {
    if (!renderEngine.textureStore.has(texturePack.albedoCompressed.fuuid)) {
      const tex = await renderEngine.textureLoader.loadAsync(
        await getPresignedDownloadUrl(texturePack.albedoCompressed)
      );
      tex.encoding = THREE.sRGBEncoding;
      renderEngine.textureStore.set(texturePack.albedoCompressed.fuuid, tex);
      material.map = tex;
    }
  }

  if (texturePack.normalCompressed !== undefined) {
    if (!renderEngine.textureStore.has(texturePack.normalCompressed.fuuid)) {
      const tex = await renderEngine.textureLoader.loadAsync(
        await getPresignedDownloadUrl(texturePack.normalCompressed)
      );
      renderEngine.textureStore.set(texturePack.normalCompressed.fuuid, tex);
      material.normalMap = tex;
    }
  }

  if (texturePack.roughnessCompressed !== undefined) {
    if (!renderEngine.textureStore.has(texturePack.roughnessCompressed.fuuid)) {
      const tex = await renderEngine.textureLoader.loadAsync(
        await getPresignedDownloadUrl(texturePack.roughnessCompressed)
      );
      renderEngine.textureStore.set(texturePack.roughnessCompressed.fuuid, tex);
      material.roughnessMap = tex;
    }
  }

  if (texturePack.metalnessCompressed !== undefined) {
    if (!renderEngine.textureStore.has(texturePack.metalnessCompressed.fuuid)) {
      const tex = await renderEngine.textureLoader.loadAsync(
        await getPresignedDownloadUrl(texturePack.metalnessCompressed)
      );
      renderEngine.textureStore.set(texturePack.metalnessCompressed.fuuid, tex);
      material.metalnessMap = tex;
    }
  }

  renderEngine.materialStore.set(_material.id, material);
}
