import styled from "@emotion/styled";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import React from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

const ToolbarContainer = styled.nav`
  width: 100%;
  height: 100%;
  grid-area: toolbar;

  border-bottom: green 1px solid;
`;

const Toolbar = () => {
  return (
    <ToolbarContainer>
      {/* <Stack direction="row"> */}
      <ListItemButton component="button" sx={{ p: "auto", m: 0 }}>
        <ListItemIcon sx={{ m: 0, p: 0, height: "100%", fontSize: 50 }}>
          <PlayArrowRoundedIcon color="secondary" />
        </ListItemIcon>
        {/* <ListItemText
            sx={{ my: 0 }}
            primary="Play"
            primaryTypographyProps={{
              fontSize: 20,
              fontWeight: "medium",
              letterSpacing: 0,
            }}
          /> */}
      </ListItemButton>
      {/* </Stack> */}
    </ToolbarContainer>
  );
};

export default Toolbar;
