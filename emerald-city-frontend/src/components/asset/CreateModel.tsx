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

const CreateModel = () => {
  const [open, setOpen] = React.useState(true);

  const dispatch = useDispatch();
  const importedMeshes = useSelector(
    (state: RootState) => state.importedMeshes
  );
  const materials = useSelector((state: RootState) => state.material);

  const initialState: Omit<api.Model, "id"> = {
    name: "",
    type: api.ModelType.Imported,
    materialID: "",
    importedMeshID: "",
    primitiveMeshType: undefined,
  };

  const formik: FormikProps<Omit<api.Model, "id">> = useFormik({
    initialValues: initialState,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      //console.log(values);

      await fetch(`${REST_API_URL}/model/create`, {
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
            <DialogTitle color="secondary">Create Model</DialogTitle>
            <DialogContent>
              <DialogContentText>Do what you like.</DialogContentText>
              <Container>
                <Divider />
                <Grid sx={{ mt: "0.25rem" }} rowGap={1} container spacing={2}>
                  <Grid item {...{ sm: 12, lg: 3 }}>
                    <TextField
                      label="Model Name"
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                  </Grid>
                  <Grid item {...{ sm: 12, lg: 3 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        name="type"
                        value={formik.values.type}
                        label="Type"
                        onChange={formik.handleChange}
                      >
                        <MenuItem value={api.ModelType.Imported}>
                          {api.ModelType.Imported}
                        </MenuItem>
                        <MenuItem value={api.ModelType.Basic}>
                          {api.ModelType.Basic}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item {...{ sm: 12, lg: 3 }}>
                    <Autocomplete
                      fullWidth
                      disablePortal
                      id="combo-box-demo"
                      options={importedMeshes}
                      getOptionLabel={(option) => option.name}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      onChange={(event, value) =>
                        formik.setFieldValue("importedMeshID", value?.id)
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Imported Mesh Name" />
                      )}
                    />
                  </Grid>
                  <Grid item {...{ sm: 12, lg: 3 }}>
                    <Autocomplete
                      fullWidth
                      disablePortal
                      id="combo-box-demo"
                      options={materials}
                      getOptionLabel={(option) => option.materialName}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      onChange={(event, value) =>
                        formik.setFieldValue("materialID", value?.id)
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Material Name" />
                      )}
                    />
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

export default CreateModel;
