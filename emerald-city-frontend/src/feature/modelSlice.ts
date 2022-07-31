import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as api from "@backend/types/api/Core";

export interface UpdateParam {
  modelID: string;
  updatedModel: api.Model;
}

export const modelSlice = createSlice({
  name: "Models",
  initialState: [] as api.Model[],
  reducers: {
    addModel: (state, action: PayloadAction<api.Model>) => {
      state.push(action.payload);
    },
    updateModel: (state, action: PayloadAction<UpdateParam>) => {
      const index = state.findIndex(
        (model) => model.id === action.payload.modelID
      );
      state[index] = action.payload.updatedModel;

      return state;
    },
  },
});

export const { addModel, updateModel } = modelSlice.actions;

export default modelSlice.reducer;
