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

const ModelViewer = () => {
  const [open, setOpen] = React.useState(true);
  const [filterModelName, setFilterModelName] = React.useState<string>("");
  const models = useSelector((state: RootState) => state.model);

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
                        e.dataTransfer.setData(
                          "text/plain",
                          JSON.stringify({
                            dropObjectType: DropObjectType.Model,
                            data: model.id,
                          } as DropData)
                        );
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
