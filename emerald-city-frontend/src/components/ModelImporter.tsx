import { Paper, Box, Stack, Divider } from "@mui/material";
import React from "react";
import FireNav from "./layout/FireNav";
import SidebarListTitle from "./layout/SidebarListTitle";

const ModelImporter = () => {
  return (
    <Box maxHeight="20rem" overflow="auto">
      <Divider />
      <SidebarListTitle label="Model Importer" />
      <Divider />
    </Box>
  );
};

export default ModelImporter;
