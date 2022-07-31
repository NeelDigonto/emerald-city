import * as api from "@backend/types/api/Core";
import { store } from "@src/app/store";
import { Engine } from "@src/core/Engine";
import { SceneObject } from "@src/core/SceneGraph";
import {
  ensureImportedMesh,
  ensureMaterial,
  ensureModel,
} from "@src/core/SceneReconstruction";
import { replaceMat } from "@src/core/utils";
import { addMaterial } from "@src/feature/materialSlice";
import { addModel } from "@src/feature/modelSlice";
import { DropData, DropObjectType } from "@src/types/Core";
import { useDispatch } from "react-redux";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";

function handleModelDrop(engine: Engine, modelID: string) {
  const renderEngine = engine.renderEngine!;

  if (renderEngine.modelStore.has(modelID)) {
    const renderObject = renderEngine.modelStore.get(modelID)!.clone();
    renderEngine.mainScene.add(renderObject);

    renderObject.scale.set(0.04, 0.04, 0.04);
    renderEngine.mainScene.add(renderObject);
    engine.sceneGraph.add(engine.sceneGraph.root!.id, {
      id: uuidv4(),

      name: "Untitled",
      type: api.SceneObjectType.ImportedMeshModel,
      isSelectable: true,
      isSelected: false,
      renderObject: renderObject,
      parent: engine.sceneGraph.root!,
      childrens: [],

      modelID: modelID,
    });
  } else {
    const model = store
      .getState()
      .model.find((_model) => _model.id === modelID)!;

    if (model.type === api.ModelType.Imported) {
      ensureModel(renderEngine, modelID).then(() => {
        //console.log("FF", renderEngine.modelStore.get(modelID));

        const renderObject = renderEngine.modelStore.get(modelID)!.clone();

        renderObject.scale.set(0.04, 0.04, 0.04);
        renderEngine.mainScene.add(renderObject);

        engine.sceneGraph.add(engine.sceneGraph.root!.id, {
          id: uuidv4(),

          name: "Untitled",
          type: api.SceneObjectType.ImportedMeshModel,
          isSelectable: true,
          isSelected: false,
          renderObject: renderObject,
          parent: engine.sceneGraph.root!,
          childrens: [],

          modelID: modelID,
        });
      });
    }
  }
}

async function handleBasicShapeDrop(
  engine: Engine,
  primitiveMeshType: api.PrimitiveMesh
) {
  const renderEngine = engine.renderEngine!;

  if (renderEngine.primitiveMeshStore.has(primitiveMeshType)) {
    const dbMat = api.basicStandardMat;
    dbMat.materialName = `Untitled Mat${store.getState().material.length}`;

    const matID = (
      await fetch("http://localhost:5000/material/create", {
        method: "POST",
        body: JSON.stringify(dbMat),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json())
    ).id;

    store.dispatch(addMaterial({ id: matID, ...dbMat }));

    const dbModel: Omit<api.Model, "id"> = {
      name: "Untitled Basic Shape",
      type: api.ModelType.Basic,
      primitiveMeshType: primitiveMeshType,
      materialID: matID,
    };

    const modelID = (
      await fetch("http://localhost:5000/model/create", {
        method: "POST",
        body: JSON.stringify(dbModel),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json())
    ).id;

    store.dispatch(addModel({ id: modelID, ...dbModel }));

    await ensureModel(renderEngine, modelID);

    const renderObject = renderEngine.modelStore.get(modelID)!;

    renderEngine.mainScene.add(renderObject);
    //crete the mat and model

    //renderObject.scale.set(0.04, 0.04, 0.04);
    engine.sceneGraph.add(engine.sceneGraph.root!.id, {
      id: uuidv4(),

      name: "Untitled",
      type: api.SceneObjectType.PrimitiveMeshModel,
      isSelectable: true,
      isSelected: false,
      renderObject: renderObject,
      parent: engine.sceneGraph.root!,
      childrens: [],

      modelID: modelID,
    });
  }
}

function handleLightDrop(engine: Engine, lightType: api.Light) {
  const renderEngine = engine.renderEngine!;

  /*   switch (lightType) {
    case api.Light.Ambient:
      {
        const light = new THREE.AmbientLight(0x404040, 1); // soft white light
        renderEngine.mainScene.add(light);
        engine.sceneGraph.add(
          engine.sceneGraph.root!.id,
          new SceneObject("Sky Light", light, api.SceneObjectType.Light, true)
        );
      }
      break;
    case api.Light.Directional:
      {
        const light = new THREE.DirectionalLight(0x404040, 1); // soft white light
        renderEngine.mainScene.add(light);
        engine.sceneGraph.add(
          engine.sceneGraph.root!.id,
          new SceneObject(
            "Directional Light",
            light,
            api.SceneObjectType.Light,
            true
          )
        );
      }
      break;
    case api.Light.RectArea:
      {
        const light = new THREE.RectAreaLight(0x404040, 1, 1, 1); // soft white light
        renderEngine.mainScene.add(light);
        engine.sceneGraph.add(
          engine.sceneGraph.root!.id,
          new SceneObject(
            "RectArea Light",
            light,
            api.SceneObjectType.Light,
            true
          )
        );
      }
      break;
    case api.Light.Spot:
      {
        const light = new THREE.SpotLight(0x404040, 1); // soft white light
        renderEngine.mainScene.add(light);
        engine.sceneGraph.add(
          engine.sceneGraph.root!.id,
          new SceneObject("Spot Light", light, api.SceneObjectType.Light, true)
        );
      }
      break;
    case api.Light.Point:
      {
        const light = new THREE.PointLight(0x404040, 1); // soft white light
        renderEngine.mainScene.add(light);
        engine.sceneGraph.add(
          engine.sceneGraph.root!.id,
          new SceneObject("Point Light", light, api.SceneObjectType.Light, true)
        );
      }
      break;
    default:
      break;
  }
 */
  /* renderEngine.mainScene.add(renderObject);

    //renderObject.scale.set(0.04, 0.04, 0.04);
    renderEngine.mainScene.add(renderObject);
    engine.sceneGraph.add(
      engine.sceneGraph.root!.id,
      new SceneObject(
        "Untitled",
        renderObject,
        api.SceneObjectType.MeshObject,
        true
      )
    ); */
}

export function dropCallback(
  engine: Engine,
  e: React.DragEvent<HTMLDivElement>
) {
  const renderEngine = engine.renderEngine!;
  if (renderEngine) {
    const dropData: DropData = JSON.parse(
      e.dataTransfer!.getData("text/plain")
    );

    if (dropData.dropObjectType === DropObjectType.Model)
      handleModelDrop(engine, dropData.data);
    else if (dropData.dropObjectType === DropObjectType.BasicShape)
      handleBasicShapeDrop(engine, dropData.data);
    else if (dropData.dropObjectType === DropObjectType.Light)
      handleLightDrop(engine, dropData.data);
  }
}
