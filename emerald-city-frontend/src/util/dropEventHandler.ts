import { api } from "@backend/types/api/Core";
import { store } from "@src/app/store";
import { Engine } from "@src/core/Engine";
import { SceneObject, SceneObjectType } from "@src/core/SceneGraph";
import { replaceMat } from "@src/core/utils";

export function dropCallback(
  engine: Engine,
  e: React.DragEvent<HTMLDivElement>
) {
  const renderEngine = engine.renderEngine!;
  if (renderEngine) {
    const modelID = e.dataTransfer!.getData("text/plain");

    if (renderEngine.modelStore.has(modelID)) {
      const renderObject = renderEngine.modelStore.get(modelID)!.clone();
      renderEngine.mainScene.add(renderObject);

      renderObject.scale.set(0.04, 0.04, 0.04);
      renderEngine.mainScene.add(renderObject);
      engine.sceneGraph.add(
        engine.sceneGraph.root!.id,
        new SceneObject(
          "Untitled",
          renderObject,
          SceneObjectType.MeshObject,
          true
        )
      );
    } else {
      const promises: Promise<any>[] = [];

      const model = store
        .getState()
        .model.find((_model) => _model.id === modelID)!;

      if (model.type === api.ModelType.Imported) {
        if (model.materialID !== "")
          promises.push(renderEngine.ensureMaterial(model.materialID));

        if (model.importedMeshID !== "")
          promises.push(renderEngine.ensureImportedMesh(model.importedMeshID));
      }

      Promise.all(promises)
        .then(() => {
          const tempIModel = renderEngine.importedMeshStore.get(
            model.importedMeshID!
          )!;
          //.clone();

          const mat = renderEngine.materialStore.get(model.materialID!)!;

          replaceMat(tempIModel, mat);
          renderEngine.modelStore.set(modelID, tempIModel);
        })
        .then(() => {
          const renderObject = renderEngine.modelStore.get(modelID)!.clone();

          renderObject.scale.set(0.04, 0.04, 0.04);
          renderEngine.mainScene.add(renderObject);
          engine.sceneGraph.add(
            engine.sceneGraph.root!.id,
            new SceneObject(
              "Untitled",
              renderObject,
              SceneObjectType.MeshObject,
              true
            )
          );
        });
    }
  }
}
