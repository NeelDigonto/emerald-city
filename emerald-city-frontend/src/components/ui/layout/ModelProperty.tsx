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
import { RootState } from "@src/app/store";
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

const ModelProperty = () => {
  const engine = useEngineContext();

  const [sceneObjects, setSceneObjects] = React.useState<SceneObject[]>([]);

  /*   React.useEffect(() => {
    const id = engine.renderEngine!.editorControls.registerRaycastCallback(
      (sceneObjects) => {
        setSceneObjects(() => sceneObjects);
      }
    );

    return () => {
      engine.renderEngine!.editorControls.removeRaycastCallback(id);
    };
  }, []); */

  const materials = useSelector((state: RootState) => state.material);

  return (
    <Stack direction="column">
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
                  if (
                    value &&
                    sceneObjects instanceof THREE.Group &&
                    sceneObjects instanceof THREE.Mesh
                  ) {
                    engine.renderEngine!.ensureMaterial(value.id);
                    replaceMat(
                      sceneObjects,
                      engine.renderEngine!.materialStore.get(value.id)!
                    );
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
