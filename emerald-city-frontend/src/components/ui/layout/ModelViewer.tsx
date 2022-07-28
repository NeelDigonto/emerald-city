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
          renderObject.position.setX(Math.floor(Math.random() * 30) - 15);
          renderObject.position.setZ(Math.floor(Math.random() * 30) - 15);
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
            promises.push(renderEngine.ensureMaterial(model.materialID!));
            promises.push(
              renderEngine.ensureImportedModel(model.importedModelID!)
            );
          }

          Promise.all(promises)
            .then(() => {
              const tempIModel = renderEngine.importedModelStore.get(
                model.importedModelID!
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
              renderObject.position.setX(Math.floor(Math.random() * 30) - 15);
              renderObject.position.setZ(Math.floor(Math.random() * 30) - 15);
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
          <Box
            sx={{
              bgcolor: open ? "rgba(71, 98, 130, 0.2)" : null,
              pb: open ? 2 : 0,
            }}
          >
            <TextField
              fullWidth
              label="Model Name"
              name="name"
              onChange={(event) => setFilterModelName(() => event.target.value)}
              value={filterModelName}
            />
            <ListItemButton
              alignItems="flex-start"
              onClick={() => setOpen(!open)}
              sx={{
                px: 3,
                pt: 2.5,
                pb: open ? 0 : 2.5,
                "&:hover, &:focus": { "& svg": { opacity: open ? 1 : 0 } },
              }}
            >
              <ListItemText
                primary="Models"
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: "medium",
                  lineHeight: "20px",
                  mb: "2px",
                }}
                secondary="Box, Cylinder, etc."
                secondaryTypographyProps={{
                  noWrap: true,
                  fontSize: 12,
                  lineHeight: "16px",
                  color: open ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
                }}
                sx={{ my: 0 }}
              />
              <KeyboardArrowDown
                sx={{
                  mr: -1,
                  opacity: 0,
                  transform: open ? "rotate(-180deg)" : "rotate(0)",
                  transition: "0.2s",
                }}
              />
            </ListItemButton>
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
          </Box>
        </FireNav>
      </Paper>
    </Stack>
  );
};

export default ModelViewer;
