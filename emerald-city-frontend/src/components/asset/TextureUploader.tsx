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
import { MapTypes, SidebarPanel, textureMaps } from "@src/types/Core";
import * as api from "@backend/types/api/Core";
import { uploadFile } from "@src/utils";
import { setActiveSidebarPanel } from "@src/feature/activeSidebarPanelSlice";
import { useDispatch } from "react-redux";

const Image = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  object-fit: cover;
`;

const UploadArea = ({
  formik,
  mapName,
  mapTag,
  fileRef,
}: {
  formik: FormikProps<api.RequestImageProc>;
  mapName: string;
  mapTag: MapTypes;
  fileRef: React.RefObject<HTMLInputElement>;
}) => {
  const imgRef = React.useRef<HTMLImageElement>(null);
  //const [, forceUpdate] = React.useReducer((x: number) => x + 1, 0);

  return (
    <Paper sx={{ mr: "1rem", my: "1rem" }}>
      <Paper
        elevation={12}
        sx={{ mx: "1rem", width: "12rem", height: "12rem" }}
      >
        <Box sx={{ width: "100%", height: "100%", padding: "auto" }}>
          <Image
            ref={imgRef}
            src=""
            //onError={(ev) => (ev.currentTarget.style.display = "none")}
            //onChange={(ev) => (ev.currentTarget.style.display = "inline")}
            onClick={() => {
              fileRef.current!.click();
            }}
          />
        </Box>
      </Paper>
      <Button
        variant="text"
        fullWidth
        endIcon={<AddPhotoAlternateRoundedIcon />}
        onClick={() => {
          fileRef.current!.click();
        }}
      >
        <input
          type="file"
          ref={fileRef}
          name="myImage"
          hidden
          accept="image/jpeg"
          onChange={(event) => {
            if (event.currentTarget.files) {
              imgRef.current!.src = URL.createObjectURL(
                event.currentTarget.files[0]
              );

              formik.setFieldValue(mapTag, true);
            }
          }}
        />
        <Typography sx={{ mt: "0.5rem", mx: "1rem" }} color="primary">
          {mapName}
        </Typography>
      </Button>
    </Paper>
  );
};

const TextureUploader = () => {
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();

  const albedoFileRef = React.useRef<HTMLInputElement>(null);
  const normalFileRef = React.useRef<HTMLInputElement>(null);
  const roughnessFileRef = React.useRef<HTMLInputElement>(null);
  const metalnessFileRef = React.useRef<HTMLInputElement>(null);
  const aoFileRef = React.useRef<HTMLInputElement>(null);

  const initialState: api.RequestImageProc = {
    texturePackName: "",
    albedo: false,
    ao: false,
    metalness: false,
    normal: false,
    roughness: false,
  };

  const formik: FormikProps<api.RequestImageProc> = useFormik({
    initialValues: initialState,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      const bucket: string = "emerald-city";

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
      }

      if (values.ao) {
        await fetch("http://localhost:5000/get-presigned-post-url", {
          method: "POST",
          body: JSON.stringify({
            bucket,
            key: `textures/${values.texturePackName}/ao.jpg`,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then(({ url, fields }) =>
            uploadFile(url, fields, aoFileRef.current!.files![0])
          );
      }

      if (values.normal) {
        await fetch("http://localhost:5000/get-presigned-post-url", {
          method: "POST",
          body: JSON.stringify({
            bucket,
            key: `textures/${values.texturePackName}/normal.jpg`,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then(({ url, fields }) =>
            uploadFile(url, fields, normalFileRef.current!.files![0])
          );
      }

      if (values.roughness) {
        await fetch("http://localhost:5000/get-presigned-post-url", {
          method: "POST",
          body: JSON.stringify({
            bucket,
            key: `textures/${values.texturePackName}/roughness.jpg`,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then(({ url, fields }) =>
            uploadFile(url, fields, roughnessFileRef.current!.files![0])
          );
      }

      if (values.metalness) {
        await fetch("http://localhost:5000/get-presigned-post-url", {
          method: "POST",
          body: JSON.stringify({
            bucket,
            key: `textures/${values.texturePackName}/metalness.jpg`,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then(({ url, fields }) =>
            uploadFile(url, fields, metalnessFileRef.current!.files![0])
          );
      }

      await fetch("http://localhost:5000/texture-pack/request-img-proc", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch(setActiveSidebarPanel(SidebarPanel.None));
      setSubmitting(false);
    },
  });

  return (
    <Dialog
      fullWidth={true}
      maxWidth="xl"
      open={open}
      onClose={() => {
        dispatch(setActiveSidebarPanel(SidebarPanel.None));
        setOpen(false);
      }}
    >
      <Paper>
        <form onSubmit={formik.handleSubmit}>
          <Container>
            <DialogTitle color="secondary">Upload Textures</DialogTitle>
            <DialogContent>
              <DialogContentText>Select your Texture Files.</DialogContentText>
              <Container>
                <Stack direction="row" maxWidth="xl" mt="1rem" flexWrap="wrap">
                  <UploadArea
                    formik={formik}
                    mapName={"Albdedo"}
                    mapTag={textureMaps["albedo"].tag}
                    fileRef={albedoFileRef}
                  />
                  <UploadArea
                    formik={formik}
                    mapName={"Normal"}
                    mapTag={textureMaps["normal"].tag}
                    fileRef={normalFileRef}
                  />
                  <UploadArea
                    formik={formik}
                    mapName={"Roughness"}
                    mapTag={textureMaps["roughness"].tag}
                    fileRef={roughnessFileRef}
                  />
                  <UploadArea
                    formik={formik}
                    mapName={"Metalness"}
                    mapTag={textureMaps["metalness"].tag}
                    fileRef={metalnessFileRef}
                  />
                  <UploadArea
                    formik={formik}
                    mapName={"Ambient occlusion"}
                    mapTag={textureMaps["ao"].tag}
                    fileRef={aoFileRef}
                  />
                </Stack>
                <Divider />
                <TextField
                  sx={{ mt: "1rem" }}
                  label="Texture Pack Name"
                  name="texturePackName"
                  onChange={formik.handleChange}
                  value={formik.values.texturePackName}
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

export default TextureUploader;
