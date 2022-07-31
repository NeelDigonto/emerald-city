import { StatusCodes } from "http-status-codes";
import React from "react";
import { useDispatch } from "react-redux";
import * as api from "@backend/types/api/Core";
import { addTexturePack } from "@src/feature/texturePackSlice";
import { addMaterial } from "@src/feature/materialSlice";
import { addImportedMesh } from "@src/feature/importedMeshSlice";
import { addModel } from "@src/feature/modelSlice";
import { REST_API_URL } from "@src/Constants";

const DataLoader = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const dispatch = useDispatch();
  const isLoaded = React.useRef(false);

  React.useEffect(() => {
    if (!isLoaded.current) {
      isLoaded.current = true;
      console.log("Data Fetched");

      fetch(`${REST_API_URL}/resource/get/${api.Table.TexturePack}`)
        .then((response) => response.json())
        .then((resources: api.TexturePack[]) => {
          resources.forEach((resource_unit) => {
            dispatch(addTexturePack(resource_unit));
          });
        });

      fetch(`${REST_API_URL}/resource/get/${api.Table.Material}`)
        .then((response) => response.json())
        .then((resources: api.Material[]) => {
          resources.forEach((resource_unit) => {
            dispatch(addMaterial(resource_unit));
          });
        });

      fetch(`${REST_API_URL}/resource/get/${api.Table.ImportedMesh}`)
        .then((response) => response.json())
        .then((resources: api.ImportedMesh[]) => {
          resources.forEach((resource_unit) => {
            dispatch(addImportedMesh(resource_unit));
          });
        });

      fetch(`${REST_API_URL}/resource/get/${api.Table.Model}`)
        .then((response) => response.json())
        .then((resources: api.Model[]) => {
          resources.forEach((resource_unit) => {
            dispatch(addModel(resource_unit));
          });
        });
    }
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default DataLoader;
