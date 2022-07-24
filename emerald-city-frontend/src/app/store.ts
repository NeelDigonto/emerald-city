import { configureStore } from "@reduxjs/toolkit";

import activeSidebarPanelSlice from "@src/feature/activeSidebarPanelSlice";
import texturePackSlice from "@src/feature/texturePackSlice";
import materialSlice from "@src/feature/materialSlice";

export const store = configureStore({
  reducer: {
    activeSidebarPanel: activeSidebarPanelSlice,
    texturePack: texturePackSlice,
    material: materialSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
