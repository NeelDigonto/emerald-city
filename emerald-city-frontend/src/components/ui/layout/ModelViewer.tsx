import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import {
  Stack,
  Paper,
  Divider,
  Box,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Autocomplete,
  TextField,
} from "@mui/material";
import React from "react";
import FireNav from "../FireNav";

import SidebarListTitle from "../SidebarListTitle";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import { RootState, store } from "@src/app/store";
import { useSelector } from "react-redux";
import ViewInArRounded from "@mui/icons-material/ViewInArRounded";
import { useEngineContext } from "@src/contexts/EngineContext";
import { api } from "@backend/types/api/Core";
import { deepTraverse, replaceMat } from "@src/core/utils";
import { SceneObject, SceneObjectType } from "@src/core/SceneGraph";
import SidebarListHeading from "../SidebarListHeading";

const ModelViewer = () => {
  const [open, setOpen] = React.useState(true);
  const [filterModelName, setFilterModelName] = React.useState<string>("");
  const models = useSelector((state: RootState) => state.model);
  //console.log(models);
  const engine = useEngineContext();
  const [, forceUpdate] = React.useReducer((x: number) => x + 1, 0);

  function dropCallback() {
    const renderEngine = engine.renderEngine!;

    if (renderEngine)
      renderEngine.container.addEventListener("drop", (e) => {
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
              promises.push(
                renderEngine.ensureImportedMesh(model.importedMeshID)
              );
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
              const renderObject = renderEngine.modelStore
                .get(modelID)!
                .clone();

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
      });
  }

  React.useEffect(() => {
    engine.registerOnRenderEngineInitializeCallback(() => {
      forceUpdate();
      dropCallback();
    });
  });

  return (
    <Stack direction="column">
      <Paper elevation={0}>
        <FireNav>
          <SidebarListTitle label="Basic Items" />
          <Divider />
          <SidebarListHeading primaryLabel="Models" secondaryLabel="">
            <TextField
              fullWidth
              label="Model Name"
              sx={{ mt: "0.5rem", mb: "0.5rem" }}
              name="name"
              onChange={(event) => setFilterModelName(() => event.target.value)}
              value={filterModelName}
            />
            {open &&
              models
                .filter(
                  (model) =>
                    filterModelName === "" ||
                    model.name
                      .toLowerCase()
                      .includes(filterModelName.trim().toLowerCase())
                )
                .map((model, index) => (
                  <React.Fragment key={index}>
                    <ListItemButton
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", model.id);
                      }}
                      key={model.id}
                      sx={{
                        py: 0,
                        minHeight: 32,
                        color: "rgba(255,255,255,.8)",
                      }}
                    >
                      <ListItemIcon sx={{ color: "inherit" }}>
                        {<ViewInArRounded />}
                      </ListItemIcon>
                      <ListItemText
                        primary={model.name}
                        primaryTypographyProps={{
                          fontSize: 14,
                          fontWeight: "medium",
                        }}
                      />
                    </ListItemButton>
                  </React.Fragment>
                ))}
          </SidebarListHeading>
        </FireNav>
      </Paper>
    </Stack>
  );
};

export default ModelViewer;
