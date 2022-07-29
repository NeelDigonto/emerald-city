import styled from "@emotion/styled";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  SvgIconTypeMap,
  Typography,
} from "@mui/material";
import React from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";
import { setActiveSidebarPanel } from "@src/feature/activeSidebarPanelSlice";
import { SidebarPanel } from "@src/types/Core";
import { useDispatch } from "react-redux";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import PageviewRoundedIcon from "@mui/icons-material/PageviewRounded";
import TextureRoundedIcon from "@mui/icons-material/TextureRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const ToolbarContainer = styled.nav`
  width: 100%;
  height: 100%;
  grid-area: toolbar;

  border-bottom: green 1px solid;
`;

const ToolbarButton = ({
  label,
  Icon,
  onClick,
}: {
  label: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  onClick: () => void;
}) => {
  return (
    <Button startIcon={<Icon fontSize="large" />} onClick={onClick}>
      <Typography
        sx={{
          color: "white",
          opacity: 0.6,
          whiteSpace: "nowrap",
          overflow: "hidden",
          fontSize: `min(1rem, 0.5rem + 0.75vw)`,
        }}
      >
        {label}
      </Typography>
    </Button>
  );
};

const Toolbar = () => {
  const dispatch = useDispatch();
  return (
    <ToolbarContainer>
      <Stack direction="row" justifyContent="space-between" overflow="auto">
        <Button
          startIcon={<PlayArrowRoundedIcon fontSize="large" />}
          href="/play"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography sx={{ color: "white", opacity: 0.6 }}>
            {"Play"}
          </Typography>
        </Button>
        <Divider orientation="vertical" />
        <ToolbarButton
          Icon={DownloadRoundedIcon}
          label="Import Textures"
          onClick={() =>
            dispatch(setActiveSidebarPanel(SidebarPanel.TexturePackImporter))
          }
        />
        <ToolbarButton
          Icon={TextureRoundedIcon}
          label="Create Material"
          onClick={() =>
            dispatch(setActiveSidebarPanel(SidebarPanel.MaterialCreator))
          }
        />
        <ToolbarButton
          Icon={DownloadRoundedIcon}
          label="Import Mesh"
          onClick={() =>
            dispatch(setActiveSidebarPanel(SidebarPanel.MeshImporter))
          }
        />
        <ToolbarButton
          Icon={LocationCityRoundedIcon}
          label="Create Model"
          onClick={() =>
            dispatch(setActiveSidebarPanel(SidebarPanel.ModelCreator))
          }
        />
        <ToolbarButton
          Icon={PageviewRoundedIcon}
          label="View Models"
          onClick={() =>
            dispatch(setActiveSidebarPanel(SidebarPanel.ModelViewer))
          }
        />
        <ToolbarButton
          Icon={DashboardCustomizeRoundedIcon}
          label="Add Basic Shapes"
          onClick={() =>
            dispatch(setActiveSidebarPanel(SidebarPanel.BasicShapes))
          }
        />
        <ToolbarButton
          Icon={LightModeRoundedIcon}
          label="Add Lights"
          onClick={() => dispatch(setActiveSidebarPanel(SidebarPanel.Lights))}
        />
        <ToolbarButton
          Icon={TuneRoundedIcon}
          label="Editor Settings"
          onClick={() =>
            dispatch(setActiveSidebarPanel(SidebarPanel.EditorSettings))
          }
        />
      </Stack>
    </ToolbarContainer>
  );
};

export default Toolbar;

{
  /* <Stack component="li" direction="row">
        <ListItemButton component="button" sx={{ p: "auto", m: 0 }}>
          <ListItemIcon sx={{ m: 0, p: 0, height: "100%", fontSize: 50 }}>
            <PlayArrowRoundedIcon color="secondary" />
          </ListItemIcon>
          <ListItemText
            sx={{ my: 0 }}
            primary="Play"
            primaryTypographyProps={{
              fontSize: 20,
              fontWeight: "medium",
              letterSpacing: 0,
            }}
          />
        </ListItemButton>
      </Stack> */
}
