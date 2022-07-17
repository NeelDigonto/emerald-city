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
} from "@mui/material";
import React from "react";

// ability to choose between
// rgb ao_rough_metal map
// albedo * ao map pre multiply

const UploadArea = ({ mapName }: { mapName: string }) => {
  return (
    <Grid item md={4} component={Paper}>
      <Paper elevation={12} sx={{ mx: "1rem" }}>
        <Box sx={{ height: "10rem", width: "10rem" }}></Box>
      </Paper>
      <Typography
        sx={{ mt: "0.5rem", mx: "1rem" }}
        color="primary"
        gutterBottom
      >
        {mapName}
      </Typography>
    </Grid>
  );
};

const MaterialUploader = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <Dialog
      fullWidth={true}
      maxWidth="xl"
      open={open}
      onClose={() => setOpen(false)}
    >
      <Paper>
        <Container>
          <DialogTitle>Upload Texture</DialogTitle>
          <DialogContent>
            <DialogContentText>Select your Texture Files.</DialogContentText>
            <Grid container maxWidth="xl" rowGap={5} mt="1rem">
              <UploadArea mapName="Albedo Map" />
              <UploadArea mapName="Normal Map" />
              <UploadArea mapName="Roughness Map" />
              <UploadArea mapName="Metalness Map" />
              <UploadArea mapName="Ambient Occlusion Map" />
            </Grid>
          </DialogContent>
        </Container>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
};

export default MaterialUploader;
