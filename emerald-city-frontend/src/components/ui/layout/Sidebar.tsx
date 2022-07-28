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
import BasicShapes from "../../asset/BaicsShapes";
import TextureUploader from "../../asset/TextureUploader";
import { useSelector } from "react-redux";
import { RootState } from "@src/app/store";
import { SidebarPanel } from "@src/types/Core";
import { getActiveElement } from "formik";
import CreateMaterial from "../../asset/CreateMaterial";
import ImportModel from "@src/components/asset/ImportMesh";
import ModelViewer from "@src/components/ui/layout/ModelViewer";
import CreateModel from "@src/components/asset/CreateModel";

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
  width: 22rem;
  height: 100%;
  grid-area: sidebar;

  overflow: auto;

  /* border-left: green 1px solid; */
`;

const Sidebar = () => {
  const [open, setOpen] = React.useState(true);
  const activeSidebarPanel = useSelector(
    (state: RootState) => state.activeSidebarPanel
  );

  return (
    <SidebarContainer>
      <ListItemButton /* component="a" href="/" */>
        <ListItemIcon sx={{ fontSize: 20 }}>
          <LocationCityRoundedIcon color="secondary" />
        </ListItemIcon>
        <ListItemText
          sx={{ my: 0 }}
          primary="Emerald City"
          primaryTypographyProps={{
            fontSize: 20,
            fontWeight: "medium",
            letterSpacing: 0,
          }}
        />
      </ListItemButton>
      <Divider />
      <WorldOutliner />
      {activeSidebarPanel === SidebarPanel.BasicShapes && <BasicShapes />}
      {activeSidebarPanel === SidebarPanel.TexturePackImporter && (
        <TextureUploader />
      )}
      {activeSidebarPanel === SidebarPanel.MaterialCreator && (
        <CreateMaterial />
      )}
      {activeSidebarPanel === SidebarPanel.ModelImporter && <ImportModel />}
      {activeSidebarPanel === SidebarPanel.CreateModel && <CreateModel />}
      <ModelViewer />
    </SidebarContainer>
  );
};

export default Sidebar;
