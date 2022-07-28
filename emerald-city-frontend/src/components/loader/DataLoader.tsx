import { StatusCodes } from "http-status-codes";
import React from "react";
import { useDispatch } from "react-redux";
import { api, db } from "@backend/types/api/Core";
import { addTexturePack } from "@src/feature/texturePackSlice";
import { addMaterial } from "@src/feature/materialSlice";
import { addImportedMesh } from "@src/feature/importedMeshSlice";
import { addModel } from "@src/feature/modelSlice";

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

      fetch(`http://localhost:5000/resource/get/${db.Table.TexturePack}`)
        .then((response) => response.json())
        .then((resources: api.TexturePack[]) => {
          resources.forEach((resource_unit) => {
            dispatch(addTexturePack(resource_unit));
          });
        });

      fetch(`http://localhost:5000/resource/get/${db.Table.Material}`)
        .then((response) => response.json())
        .then((resources: api.Material[]) => {
          resources.forEach((resource_unit) => {
            dispatch(addMaterial(resource_unit));
          });
        });

      fetch(`http://localhost:5000/resource/get/${db.Table.ImportedMesh}`)
        .then((response) => response.json())
        .then((resources: api.ImportedMesh[]) => {
          resources.forEach((resource_unit) => {
            dispatch(addImportedMesh(resource_unit));
          });
        });

      fetch(`http://localhost:5000/resource/get/${db.Table.Model}`)
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
