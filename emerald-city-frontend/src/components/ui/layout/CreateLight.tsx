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
  const models = useSelector((state: RootState) => state.model);
  //console.log(models);
  const engine = useEngineContext();
  const [, forceUpdate] = React.useReducer((x: number) => x + 1, 0);

  function dropCallback() {}

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
          <SidebarListTitle label="Lights" />
          <Divider />
          <SidebarListHeading primaryLabel="Models" secondaryLabel="">
            {open &&
              models.map((model, index) => (
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