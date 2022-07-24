import { StatusCodes } from "http-status-codes";
import React from "react";
import { useDispatch } from "react-redux";
import { api } from "@backend/types/api/Core";
import { addTexturePack } from "@src/feature/texturePackSlice";
import { addMaterial } from "@src/feature/materialSlice";

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

      fetch(`http://localhost:5000/resource/get/TexturePack`)
        .then((response) => response.json())
        .then((resources: api.TexturePack[]) => {
          resources.forEach((resource_unit) => {
            dispatch(addTexturePack(resource_unit));
          });
        });

      fetch(`http://localhost:5000/resource/get/Material`)
        .then((response) => response.json())
        .then((resources: api.Material[]) => {
          resources.forEach((resource_unit) => {
            dispatch(addMaterial(resource_unit));
          });
        });
    }
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default DataLoader;
