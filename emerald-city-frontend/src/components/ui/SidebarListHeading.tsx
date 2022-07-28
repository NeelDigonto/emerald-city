import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { Box, ListItemButton, ListItemText } from "@mui/material";
import React from "react";

const SidebarListHeading = ({
  children,
  primaryLabel,
  secondaryLabel,
}: {
  children: React.ReactNode | React.ReactNode[];
  primaryLabel: string;
  secondaryLabel: string;
}) => {
  const [open, setOpen] = React.useState(true);

  return (
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
          primary={primaryLabel}
          primaryTypographyProps={{
            fontSize: 15,
            fontWeight: "medium",
            lineHeight: "20px",
            mb: "2px",
          }}
          secondary={secondaryLabel}
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
      {children}
    </Box>
  );
};

export default SidebarListHeading;
