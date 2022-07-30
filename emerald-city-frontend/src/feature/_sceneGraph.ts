import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as api from "@backend/types/api/Core";

export const sceneGraphSlice = createSlice({
  name: "Models",
  initialState: [] as api.DBSceneObject[],
  reducers: {
    addSceneObject: (state, action: PayloadAction<api.DBSceneObject>) => {
      state.push(action.payload);
    },
  },
});

export const { addSceneObject } = sceneGraphSlice.actions;

export default sceneGraphSlice.reducer;
