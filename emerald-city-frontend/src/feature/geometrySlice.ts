import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@backend/types/api/Core";

export const geometrySlice = createSlice({
  name: "Custom Geometry",
  initialState: [] as api.Geometry[],
  reducers: {
    addGeometry: (state, action: PayloadAction<api.Geometry>) => {
      state.push(action.payload);
    },
  },
});

export const { addGeometry } = geometrySlice.actions;

export default geometrySlice.reducer;
