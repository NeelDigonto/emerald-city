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
  Slider,
  Container,
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
import * as  api  from "@backend/types/api/Core";
import { deepTraverse, replaceMat } from "@src/core/utils";
import { SceneObject, SceneObjectType } from "@src/core/SceneGraph";
import SidebarListHeading from "../SidebarListHeading";
import { DropData, DropObjectType } from "@src/types/Core";

const marks = [
  {
    value: 0,
    label: "1",
  },
  {
    value: 10,
    label: "5",
  },
  {
    value: 20,
    label: "10",
  },
  {
    value: 30,
    label: "50",
  },
  {
    value: 50,
    label: "100",
  },
  {
    value: 80,
    label: "500",
  },
  {
    value: 100,
    label: "1000",
  },
];

function valuetext(value: number) {
  return `${value}°C`;
}

const EditorSettings = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <Stack direction="column">
      <Paper elevation={0}>
        <FireNav>
          <SidebarListTitle label="Editor Settings" />
          <Divider />
          <SidebarListHeading primaryLabel="Settings" secondaryLabel="">
            <Container maxWidth="xl">
              <Slider
                aria-label="Custom marks"
                defaultValue={20}
                /* getAriaValueText={valuetext} */
                step={10}
                //valueLabelDisplay="auto"
                marks={marks}
              />
            </Container>
          </SidebarListHeading>
        </FireNav>
      </Paper>
    </Stack>
  );
};

export default EditorSettings;
