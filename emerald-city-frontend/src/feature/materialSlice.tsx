import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@backend/types/api/Core";

export const materialSlice = createSlice({
  name: "Materials",
  initialState: [] as api.Material[],
  reducers: {
    addMaterial: (state, action: PayloadAction<api.Material>) => {
      state.push(action.payload);
    },
  },
});

export const { addMaterial } = materialSlice.actions;

export default materialSlice.reducer;
