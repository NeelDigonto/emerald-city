import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@backend/types/api/Core";

export const importedMeshSlice = createSlice({
  name: "Imported Meshes",
  initialState: [] as api.ImportedMesh[],
  reducers: {
    addImportedMesh: (state, action: PayloadAction<api.ImportedMesh>) => {
      state.push(action.payload);
    },
  },
});

export const { addImportedMesh } = importedMeshSlice.actions;

export default importedMeshSlice.reducer;
