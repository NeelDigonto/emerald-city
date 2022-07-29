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
import * as api from "@backend/types/api/Core";
import { deepTraverse, replaceMat } from "@src/core/utils";
import { SceneObject, SceneObjectType } from "@src/core/SceneGraph";
import SidebarListHeading from "../SidebarListHeading";
import { DropObjectType, DropData } from "@src/types/Core";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

const CreateLight = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <Stack direction="column">
      <Paper elevation={0}>
        <FireNav>
          <SidebarListTitle label="Lights" />
          <Divider />
          <SidebarListHeading primaryLabel="Lights" secondaryLabel="">
            {open &&
              Object.keys(api.Light).map((light, index) => (
                <React.Fragment key={index}>
                  <ListItemButton
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData(
                        "text/plain",
                        JSON.stringify({
                          dropObjectType: DropObjectType.Light,
                          data: light,
                        } as DropData)
                      );
                    }}
                    key={index}
                    sx={{
                      py: 0,
                      minHeight: 32,
                      color: "rgba(255,255,255,.8)",
                    }}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      {<LightModeRoundedIcon />}
                    </ListItemIcon>
                    <ListItemText
                      primary={light}
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

export default CreateLight;
