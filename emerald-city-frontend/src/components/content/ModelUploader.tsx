import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
  DialogActions,
  Button,
  Paper,
  Typography,
  Container,
  Stack,
  TextField,
  Divider,
} from "@mui/material";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import React from "react";

import { FormikProps, useFormik } from "formik";
import Home from "@mui/icons-material/Home";
import styled from "@emotion/styled";
import { MapTypes, textureMaps } from "@src/types/Core";
import { api } from "@backend/types/api/Core";

const ModelImporter = () => {
  const [open, setOpen] = React.useState(true);

  const modelRef = React.useRef<HTMLInputElement>(null);

  const initialState: api.RequestModelProc = {
    modelName: "",
  };

  const formik: FormikProps<api.RequestModelProc> = useFormik({
    initialValues: initialState,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      const bucket: string = "emerald-city";
      /* 
      if (values.albedo) {
        await fetch("http://localhost:5000/get-presigned-post-url", {
          method: "POST",
          body: JSON.stringify({
            bucket,
            key: `textures/${values.texturePackName}/albedo.jpg`,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then(({ url, fields }) =>
            uploadFile(url, fields, albedoFileRef.current!.files![0])
          );
      } */

      setSubmitting(false);
    },
  });

  return (
    <Dialog
      fullWidth={true}
      maxWidth="xl"
      open={open}
      onClose={() => setOpen(false)}
    >
      <Paper>
        <form onSubmit={formik.handleSubmit}>
          <Container>
            <DialogTitle color="secondary">Upload Fbx Model</DialogTitle>
            <DialogContent>
              <DialogContentText>Select your Model File.</DialogContentText>
              <Container>
                <Stack
                  direction="row"
                  maxWidth="xl"
                  mt="1rem"
                  flexWrap="wrap"
                ></Stack>
                <Divider />
                <TextField
                  sx={{ mt: "1rem" }}
                  label="Model Name"
                  name="modelName"
                  onChange={formik.handleChange}
                  value={formik.values.modelName}
                />
              </Container>
            </DialogContent>
          </Container>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Close</Button>
            <Button type="submit" disabled={formik.isSubmitting}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Paper>
    </Dialog>
  );
};

export default ModelImporter;
