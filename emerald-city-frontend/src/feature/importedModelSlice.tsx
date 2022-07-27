import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@backend/types/api/Core";

export const importedModelSlice = createSlice({
  name: "Imported Models",
  initialState: [] as api.ImportedModel[],
  reducers: {
    addImportedModel: (state, action: PayloadAction<api.ImportedModel>) => {
      state.push(action.payload);
    },
  },
});

export const { addImportedModel } = importedModelSlice.actions;

export default importedModelSlice.reducer;
