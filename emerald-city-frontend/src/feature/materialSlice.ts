import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as api from "@backend/types/api/Core";

export interface UpdateParam {
  materialID: string;
  updatedMaterial: api.Material;
}

export const materialSlice = createSlice({
  name: "Materials",
  initialState: [] as api.Material[],
  reducers: {
    addMaterial: (state, action: PayloadAction<api.Material>) => {
      state.push(action.payload);
    },
    updateMaterial: (state, action: PayloadAction<UpdateParam>) => {
      const index = state.findIndex(
        (model) => model.id === action.payload.materialID
      );
      state[index] = action.payload.updatedMaterial;

      return state;
    },
  },
});

export const { addMaterial, updateMaterial } = materialSlice.actions;

export default materialSlice.reducer;
