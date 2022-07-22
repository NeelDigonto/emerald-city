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
  Typography,
} from "@mui/material";
import React from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";

const ToolbarContainer = styled.nav`
  width: 100%;
  height: 100%;
  grid-area: toolbar;

  border-bottom: green 1px solid;
`;

const Toolbar = () => {
  return (
    <ToolbarContainer>
      {/* <Stack component="li" direction="row">
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
      </Stack> */}
      <Stack direction="row" columnGap="5rem">
        <Button startIcon={<PlayArrowRoundedIcon fontSize="large" />}>
          <Typography sx={{ color: "white", opacity: 0.6 }}>Play</Typography>
        </Button>
        <Divider />
        <Button startIcon={<DownloadRoundedIcon fontSize="large" />}>
          <Typography sx={{ color: "white", opacity: 0.6 }}>
            Import Material
          </Typography>
        </Button>
        <Button startIcon={<DownloadRoundedIcon fontSize="large" />}>
          <Typography sx={{ color: "white", opacity: 0.6 }}>
            Import Geometry
          </Typography>
        </Button>
        <Button startIcon={<DownloadRoundedIcon fontSize="large" />}>
          <Typography sx={{ color: "white", opacity: 0.6 }}>
            Import Animation
          </Typography>
        </Button>
      </Stack>
    </ToolbarContainer>
  );
};

export default Toolbar;
