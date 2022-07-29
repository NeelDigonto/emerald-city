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
import { DropData, DropObjectType } from "@src/types/Core";

const AddBasicShapes = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <Stack direction="column">
      <Paper elevation={0}>
        <FireNav>
          <SidebarListTitle label="Basic Shapes" />
          <Divider />
          <SidebarListHeading primaryLabel="Shapes" secondaryLabel="">
            {open &&
              Object.keys(api.PrimitiveMesh).map(
                (primitiveMesh: string, index) => (
                  <React.Fragment key={index}>
                    <ListItemButton
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData(
                          "text/plain",
                          JSON.stringify({
                            dropObjectType: DropObjectType.BasicShape,
                            data: primitiveMesh,
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
                        {<ViewInArRounded />}
                      </ListItemIcon>
                      <ListItemText
                        primary={primitiveMesh}
                        primaryTypographyProps={{
                          fontSize: 14,
                          fontWeight: "medium",
                        }}
                      />
                    </ListItemButton>
                  </React.Fragment>
                )
              )}
          </SidebarListHeading>
        </FireNav>
      </Paper>
    </Stack>
  );
};

export default AddBasicShapes;
