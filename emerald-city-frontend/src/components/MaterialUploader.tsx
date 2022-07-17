import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  DialogActions,
  Button,
  Paper,
  Typography,
  Container,
  Grid,
  Stack,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import React from "react";

import { FormikProps, useFormik } from "formik";
import Home from "@mui/icons-material/Home";
import styled from "@emotion/styled";
import { textureMaps } from "@src/types/Core";

// ability to choose between
// rgb ao_rough_metal map
// albedo * ao map pre multiply

const Image = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  object-fit: cover;
`;

const UploadArea = ({ mapName }: { mapName: string }) => {
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);
  //const [, forceUpdate] = React.useReducer((x: number) => x + 1, 0);

  return (
    <Paper sx={{ mr: "1rem", my: "1rem" }}>
      {/* <Container maxWidth="xl" sx={{ p: 0, m: 0 }}> */}
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
              inputFileRef.current!.click();
            }}
          />
        </Box>
      </Paper>
      <Button
        variant="text"
        fullWidth
        endIcon={<AddPhotoAlternateRoundedIcon />}
        onClick={() => {
          inputFileRef.current!.click();
        }}
      >
        <input
          type="file"
          ref={inputFileRef}
          name="myImage"
          hidden
          accept="image/jpeg"
          onChange={(event) => {
            if (event.currentTarget.files) {
              imgRef.current!.src = URL.createObjectURL(
                event.currentTarget.files[0]
              );
            }
          }}
        />
        <Typography sx={{ mt: "0.5rem", mx: "1rem" }} color="primary">
          {mapName}
        </Typography>
      </Button>
      {/* </Container> */}
    </Paper>
  );
};

export interface MaterialUploadParams {
  albedo: boolean;
  normal: boolean;
  ao: boolean;
  metalness: boolean;
  roughness: boolean;
}

const MaterialUploader = () => {
  const [open, setOpen] = React.useState(true);

  const formik: FormikProps<MaterialUploadParams> = useFormik({
    initialValues: {} as MaterialUploadParams,
    validateOnChange: false,
    onSubmit: (values_, { setSubmitting }) => {
      fetch("http://localhost:5000/get-presigned-post-urls", {
        method: "POST",
        body: JSON.stringify({ laura: "sayantoni" }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => console.log(result))
        .then((_) => setSubmitting(false));
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
            <DialogTitle color="secondary">Upload Textures</DialogTitle>
            <DialogContent>
              <DialogContentText>Select your Texture Files.</DialogContentText>
              <Container>
                <Stack direction="row" maxWidth="xl" mt="1rem" flexWrap="wrap">
                  {Object.entries(textureMaps).map((textureMap, index) => (
                    <UploadArea key={index} mapName={textureMap[1].shortName} />
                  ))}
                </Stack>
              </Container>
            </DialogContent>
          </Container>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Close</Button>
            <Button
              type="submit"
              onClick={formik.submitForm}
              disabled={formik.isSubmitting}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Paper>
    </Dialog>
  );
};

export default MaterialUploader;
