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
  Typography,
} from "@mui/material";
import React from "react";
import FireNav from "../FireNav";

import SidebarListTitle from "../SidebarListTitle";
import SidebarListHeading from "../SidebarListHeading";

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
              <Stack>
                <Box>
                  <Typography
                    gutterBottom
                    sx={{
                      color: "white",
                      opacity: 0.6,
                    }}
                  >
                    Position Snap Value
                  </Typography>
                  <Slider
                    aria-label="Custom marks"
                    defaultValue={20}
                    step={10}
                    valueLabelDisplay="auto"
                    marks={marks}
                  />
                </Box>
                <Box>
                  <Typography
                    gutterBottom
                    sx={{
                      color: "white",
                      opacity: 0.6,
                    }}
                  >
                    Rotation Snap Value
                  </Typography>
                  <Slider
                    aria-label="Custom marks"
                    defaultValue={20}
                    step={10}
                    valueLabelDisplay="auto"
                    marks={marks}
                  />
                </Box>
                <Box>
                  <Typography
                    gutterBottom
                    sx={{
                      color: "white",
                      opacity: 0.6,
                    }}
                  >
                    Scale Snap Value
                  </Typography>
                  <Slider
                    aria-label="Custom marks"
                    defaultValue={20}
                    step={10}
                    valueLabelDisplay="auto"
                    marks={marks}
                  />
                </Box>
              </Stack>
            </Container>
          </SidebarListHeading>
        </FireNav>
      </Paper>
    </Stack>
  );
};

export default EditorSettings;
