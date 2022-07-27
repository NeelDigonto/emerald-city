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
import WorldOutliner from "../ui/layout/WorldOutliner";
import SidebarListTitle from "../ui/SidebarListTitle";
import FireNav from "../ui/FireNav";

const data = [
  { icon: <SquareRoundedIcon />, label: "Box" },
  { icon: <SquareRoundedIcon />, label: "Cylinder" },
];

const BasicShapes = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <Stack direction="column">
      <Paper elevation={0}>
        <FireNav>
          <SidebarListTitle label="Basic Items" />
          <Divider />
          <Box
            sx={{
              bgcolor: open ? "rgba(71, 98, 130, 0.2)" : null,
              pb: open ? 2 : 0,
            }}
          >
            <ListItemButton
              alignItems="flex-start"
              onClick={() => setOpen(!open)}
              sx={{
                px: 3,
                pt: 2.5,
                pb: open ? 0 : 2.5,
                "&:hover, &:focus": { "& svg": { opacity: open ? 1 : 0 } },
              }}
            >
              <ListItemText
                primary="Standard 3D"
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: "medium",
                  lineHeight: "20px",
                  mb: "2px",
                }}
                secondary="Box, Cylinder, etc."
                secondaryTypographyProps={{
                  noWrap: true,
                  fontSize: 12,
                  lineHeight: "16px",
                  color: open ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
                }}
                sx={{ my: 0 }}
              />
              <KeyboardArrowDown
                sx={{
                  mr: -1,
                  opacity: 0,
                  transform: open ? "rotate(-180deg)" : "rotate(0)",
                  transition: "0.2s",
                }}
              />
            </ListItemButton>
            {/* <Divider /> */}
            {open &&
              data.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItemButton
                    key={item.label}
                    sx={{
                      py: 0,
                      minHeight: 32,
                      color: "rgba(255,255,255,.8)",
                    }}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    />
                  </ListItemButton>
                  {/* <Divider /> */}
                </React.Fragment>
              ))}
          </Box>
        </FireNav>
      </Paper>
    </Stack>
  );
};

export default BasicShapes;

/**
  Box
  Sphere
  Cylinder
  Cone
  TorusGeometry
  TorusKnotGeometry
  TubeGeometry
  TetrahedronGeometry
  OctahedronGeometry
  DodecahedronGeometry
  IcosahedronGeometry
  ExtrudeGeometry
  ParametricGeometry
  LatheGeometry
  TextGeometry

  Plane
  Circle
  RingGeometry
  ShapeGeometry

  EdgesGeometry
  WireframeGeometry

 */
