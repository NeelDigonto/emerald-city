import ArrowRight from "@mui/icons-material/ArrowRight";
import Settings from "@mui/icons-material/Settings";
import ViewInArRoundedIcon from "@mui/icons-material/ViewInArRounded";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
} from "@mui/material";
import React from "react";

const SidebarListTitle = ({ label }: { label: string }) => {
  return (
    <ListItem component="div" disablePadding>
      <ListItemButton sx={{ height: 56 }}>
        <ListItemIcon>
          <ViewInArRoundedIcon color="primary" />
        </ListItemIcon>
        <ListItemText
          primary={label}
          primaryTypographyProps={{
            color: "primary",
            fontWeight: "medium",
            variant: "body2",
          }}
        />
      </ListItemButton>
      <Tooltip title={`${label} Settings`}>
        <IconButton
          size="large"
          sx={{
            "& svg": {
              color: "rgba(255,255,255,0.8)",
              transition: "0.2s",
              transform: "translateX(0) rotate(0)",
            },
            "&:hover, &:focus": {
              bgcolor: "unset",
              "& svg:first-of-type": {
                transform: "translateX(-4px) rotate(-20deg)",
              },
              "& svg:last-of-type": {
                right: 0,
                opacity: 1,
              },
            },
            "&:after": {
              content: '""',
              position: "absolute",
              height: "80%",
              display: "block",
              left: 0,
              width: "1px",
              bgcolor: "divider",
            },
          }}
        >
          <Settings />
          <ArrowRight sx={{ position: "absolute", right: 4, opacity: 0 }} />
        </IconButton>
      </Tooltip>
    </ListItem>
  );
};

export default SidebarListTitle;
