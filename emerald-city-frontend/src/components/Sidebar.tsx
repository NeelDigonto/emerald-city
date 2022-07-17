import styled from "@emotion/styled";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
import React from "react";
import ArrowRight from "@mui/icons-material/ArrowRight";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Home from "@mui/icons-material/Home";
import Settings from "@mui/icons-material/Settings";
import People from "@mui/icons-material/People";
import PermMedia from "@mui/icons-material/PermMedia";
import Dns from "@mui/icons-material/Dns";
import Public from "@mui/icons-material/Public";
import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import WorldOutliner from "./WorldOutliner";
import MaterialExplorer from "./MaterialExplorer";
import BasicShapes from "./BaicsShapes";
import MaterialUploader from "./MaterialUploader";

const data = [
  { icon: <SquareRoundedIcon />, label: "Box" },
  { icon: <SquareRoundedIcon />, label: "Cylinder" },
];

const FireNav = styled(List)<{ component?: React.ElementType }>({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

const SidebarContainer = styled.nav`
  width: 100%;
  height: 100%;
  grid-area: sidebar;

  overflow: auto;

  border-left: green 1px solid;
`;

const Sidebar = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <SidebarContainer>
      <BasicShapes />
      {/* <MaterialExplorer name="sayantan" /> */}
      <MaterialUploader />
      <WorldOutliner />
    </SidebarContainer>
  );
};

export default Sidebar;
