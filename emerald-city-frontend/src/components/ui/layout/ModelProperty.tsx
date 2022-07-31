import ViewInArRounded from "@mui/icons-material/ViewInArRounded";
import {
  Stack,
  Paper,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Autocomplete,
  TextField,
} from "@mui/material";
import { RootState, store } from "@src/app/store";
import { useEngineContext } from "@src/contexts/EngineContext";
import { SceneObject } from "@src/core/SceneGraph";
import { replaceMat } from "@src/core/utils";
import { DropObjectType, DropData } from "@src/types/Core";
import React from "react";
import { useSelector } from "react-redux";
import FireNav from "../FireNav";
import SidebarListHeading from "../SidebarListHeading";
import SidebarListTitle from "../SidebarListTitle";
import * as THREE from "three";
import * as api from "@backend/types/api/Core";
import { ensureMaterial } from "@src/core/SceneReconstruction";
import { useDispatch } from "react-redux";
import { updateModel } from "@src/feature/modelSlice";

const ModelProperty = () => {
  const engine = useEngineContext();

  const dispatch = useDispatch();
  const materials = useSelector((state: RootState) => state.material);
  const models = useSelector((state: RootState) => state.model);

  const [sceneObjects, setSceneObjects] = React.useState<SceneObject[]>([]);

  const handleChange = (value: api.Material) => {
    const renderObject =
      engine.renderEngine?.editorControls?.transformControls.object!;
    const sceneObject = engine.sceneGraph.renderObjectToSceneObjectMap.get(
      renderObject.uuid!
    )!;

    if (
      !(sceneObject.type === api.SceneObjectType.ImportedMeshModel) &&
      !(sceneObject.type === api.SceneObjectType.PrimitiveMeshModel)
    )
      return;

    const dbModel = models.find((_model) => _model.id == sceneObject.modelID)!;

    if (dbModel && dbModel.materialID == value.id) return;

    //write to db

    ensureMaterial(engine.renderEngine!, value.id)
      .then(() =>
        replaceMat(
          sceneObject.renderObject,
          engine.renderEngine!.materialStore.get(value.id)!.clone()
        )
      )
      .then(() => {
        const newModel = { ...dbModel };
        newModel.materialID = value.id;

        fetch("http://localhost:5000/model/update", {
          method: "POST",
          body: JSON.stringify(newModel),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(() =>
          dispatch(
            updateModel({
              modelID: newModel.id,
              updatedModel: newModel,
            })
          )
        );
      });

    //console.log(sceneObject);
  };

  return (
    <Stack direction="column" sx={{ mb: "1rem" }}>
      <Paper elevation={0}>
        <FireNav>
          <SidebarListTitle label="Model Property" />
          <Divider />
          <SidebarListHeading primaryLabel="Material" secondaryLabel="">
            <Box>
              <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={materials}
                getOptionLabel={(option) => option.materialName}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, value) => {
                  if (value) {
                    handleChange(value);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Material Name" />
                )}
              />
            </Box>
          </SidebarListHeading>
        </FireNav>
      </Paper>
    </Stack>
  );
};

export default ModelProperty;
