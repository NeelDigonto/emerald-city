import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@backend/types/api/Core";

export const texturePackSlice = createSlice({
  name: "Texture Packs",
  initialState: [] as api.TexturePack[],
  reducers: {
    addTexturePack: (state, action: PayloadAction<api.TexturePack>) => {
      state.push(action.payload);
    },
  },
});

export const { addTexturePack } = texturePackSlice.actions;

export default texturePackSlice.reducer;
