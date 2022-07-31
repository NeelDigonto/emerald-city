import * as api from "@backend/types/api/Core";
import {
  Dialog,
  Paper,
  Container,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Stack,
  Divider,
  TextField,
  DialogActions,
  Button,
  Autocomplete,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { RootState } from "@src/app/store";
import { REST_API_URL } from "@src/Constants";
import { setActiveSidebarPanel } from "@src/feature/activeSidebarPanelSlice";
import { SidebarPanel, textureMaps } from "@src/types/Core";
import { FormikProps, useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const CreateMaterial = () => {
  const [open, setOpen] = React.useState(true);

  const dispatch = useDispatch();
  const texturePacks = useSelector((state: RootState) => state.texturePack);

  const initialState: Omit<api.Material, "id"> = {
    texturePackID: "",
    baseColor: 0xffffff,
    materialName: "",
    metalness: 0,
    roughness: 1,
    type: api.MaterialType.Standard,
    wrapS: api.WrapMode.ClampToEdgeWrapping,
    wrapT: api.WrapMode.ClampToEdgeWrapping,
    repeatX: 1,
    repeatY: 1,
  };

  const formik: FormikProps<Omit<api.Material, "id">> = useFormik({
    initialValues: initialState,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      //console.log(values);

      await fetch(`${REST_API_URL}/material/create`, {
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
            <DialogTitle color="secondary">Create Material</DialogTitle>
            <DialogContent>
              <DialogContentText>Do what you like.</DialogContentText>
              <Container>
                <Divider />
                <Grid sx={{ mt: "0.25rem" }} rowGap={1} container spacing={2}>
                  <Grid item {...{ sm: 12, lg: 3 }}>
                    <TextField
                      label="material Name"
                      name="materialName"
                      onChange={formik.handleChange}
                      value={formik.values.materialName}
                    />
                  </Grid>
                  <Grid item {...{ sm: 12, lg: 3 }}>
                    <Autocomplete
                      fullWidth
                      disablePortal
                      id="combo-box-demo"
                      options={texturePacks}
                      getOptionLabel={(option) => option.texturePackName}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      onChange={(event, value) =>
                        formik.setFieldValue("texturePackID", value?.id)
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Texture Pack Name" />
                      )}
                    />
                  </Grid>
                  <Grid item {...{ sm: 12, lg: 3 }}>
                    <TextField
                      fullWidth
                      id="standard-number"
                      label="Metalness"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      name="metalness"
                      value={formik.values.metalness}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item {...{ sm: 12, lg: 3 }}>
                    <TextField
                      fullWidth
                      id="standard-number"
                      label="Roughness"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      name="roughness"
                      value={formik.values.roughness}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item {...{ sm: 12, lg: 3 }}>
                    <TextField
                      fullWidth
                      id="standard-number"
                      label="Base Color"
                      variant="outlined"
                      name="baseColor"
                      value={formik.values.baseColor}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item {...{ sm: 12, lg: 3 }}>
                    <TextField
                      fullWidth
                      id="standard-number"
                      label="Repeat X"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      name="repeatX"
                      value={formik.values.repeatX}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item {...{ sm: 12, lg: 3 }}>
                    <TextField
                      fullWidth
                      id="standard-number"
                      label="Repeat Y"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      name="repeatY"
                      value={formik.values.repeatY}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item {...{ sm: 12, lg: 3 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Wrap S
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        name="wrapS"
                        value={formik.values.wrapS}
                        label="Wrap S"
                        onChange={formik.handleChange}
                      >
                        <MenuItem value={api.WrapMode.ClampToEdgeWrapping}>
                          {api.WrapMode.ClampToEdgeWrapping}
                        </MenuItem>
                        <MenuItem value={api.WrapMode.MirroredRepeatWrapping}>
                          {api.WrapMode.MirroredRepeatWrapping}
                        </MenuItem>
                        <MenuItem value={api.WrapMode.RepeatWrapping}>
                          {api.WrapMode.RepeatWrapping}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item {...{ sm: 12, lg: 3 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Wrap T
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        name="wrapT"
                        value={formik.values.wrapT}
                        label="Wrap T"
                        onChange={formik.handleChange}
                      >
                        <MenuItem value={api.WrapMode.ClampToEdgeWrapping}>
                          {api.WrapMode.ClampToEdgeWrapping}
                        </MenuItem>
                        <MenuItem value={api.WrapMode.MirroredRepeatWrapping}>
                          {api.WrapMode.MirroredRepeatWrapping}
                        </MenuItem>
                        <MenuItem value={api.WrapMode.RepeatWrapping}>
                          {api.WrapMode.RepeatWrapping}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item {...{ sm: 12, lg: 3 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Material Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        name="type"
                        value={formik.values.type}
                        label="Material Type"
                        onChange={formik.handleChange}
                      >
                        {/* <MenuItem value={api.MaterialType.Basic}>
                          {api.MaterialType.Basic}
                        </MenuItem> */}
                        <MenuItem value={api.MaterialType.Standard}>
                          {api.MaterialType.Standard}
                        </MenuItem>
                        <MenuItem value={api.MaterialType.Physical}>
                          {api.MaterialType.Physical}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
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

export default CreateMaterial;
