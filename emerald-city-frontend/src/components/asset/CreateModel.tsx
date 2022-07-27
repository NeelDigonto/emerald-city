import { api } from "@backend/types/api/Core";
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
import { setActiveSidebarPanel } from "@src/feature/activeSidebarPanelSlice";
import { SidebarPanel, textureMaps } from "@src/types/Core";
import { FormikProps, useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const CreateModel = () => {
  const [open, setOpen] = React.useState(true);

  const dispatch = useDispatch();
  const texturePacks = useSelector((state: RootState) => state.texturePack);

  const initialState: Omit<api.Model, "id"> = {
    type: api.ModelType.Imported,
    geometryID: null,
    materialID: null,
    modelID: null,
  };

  const formik: FormikProps<Omit<api.Model, "id">> = useFormik({
    initialValues: initialState,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      //console.log(values);

      await fetch("http://localhost:5000/material/create", {
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
                <Grid container spacing={2}></Grid>
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
