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
  IconButton,
} from "@mui/material";
import React from "react";
import FireNav from "../FireNav";

import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import SidebarListTitle from "../SidebarListTitle";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import { RootState, store } from "@src/app/store";
import { useSelector } from "react-redux";
import ViewInArRounded from "@mui/icons-material/ViewInArRounded";
import * as api from "@backend/types/api/Core";
import SidebarListHeading from "../SidebarListHeading";
import { DropData, DropObjectType } from "@src/types/Core";
import { useDispatch } from "react-redux";
import { updateModel } from "@src/feature/modelSlice";

const AModel = ({ model }: { model: api.Model }) => {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>(model.name);

  const dispatch = useDispatch();

  return (
    <React.Fragment>
      {!isEditing && (
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
          <IconButton
            sx={{ m: 0, p: 0, pr: 2 }}
            onClick={(e) => setIsEditing(true)}
          >
            <DriveFileRenameOutlineRoundedIcon
              fontSize="small"
              color="secondary"
            />
          </IconButton>
        </ListItemButton>
      )}
      {isEditing && (
        <ListItemButton
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
          <TextField
            sx={{ m: 0, p: 0, mr: "0.5rem", input: { color: "primary" } }}
            size="small"
            label="Name"
            name="name"
            onChange={(e) => setName(() => e.target.value)}
            value={name}
          />
          <IconButton
            sx={{ m: 0, p: 0, pr: 2 }}
            onClick={(e) => {
              const updatedModel = { ...model, name: name };

              fetch("http://localhost:5000/model/update", {
                method: "POST",
                body: JSON.stringify(updatedModel),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then(() =>
                  dispatch(
                    updateModel({
                      modelID: model.id,
                      updatedModel: updatedModel,
                    })
                  )
                )
                .then(() => setIsEditing(false));
            }}
          >
            <SaveRoundedIcon fontSize="small" color="secondary" />
          </IconButton>
        </ListItemButton>
      )}
    </React.Fragment>
  );
};

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
                .filter((model) => model.type !== api.ModelType.Basic)
                .map((model, index) => <AModel model={model} key={index} />)}
          </SidebarListHeading>
        </FireNav>
      </Paper>
    </Stack>
  );
};

export default ModelViewer;
