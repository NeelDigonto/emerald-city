import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@backend/types/api/Core";

export const modelSlice = createSlice({
  name: "Models",
  initialState: [] as api.Model[],
  reducers: {
    addModel: (state, action: PayloadAction<api.Model>) => {
      state.push(action.payload);
    },
  },
});

export const { addModel } = modelSlice.actions;

export default modelSlice.reducer;
