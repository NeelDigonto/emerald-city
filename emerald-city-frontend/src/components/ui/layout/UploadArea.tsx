import styled from "@emotion/styled";
import { Paper, Box, Button, Typography } from "@mui/material";
import { MapTypes } from "@src/types/Core";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import { FormikProps } from "formik";
import React from "react";
import { api } from "@backend/types/api/Core";

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
