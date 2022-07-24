import { configureStore } from "@reduxjs/toolkit";

import activeSidebarPanelSlice from "@src/feature/activeSidebarPanelSlice";
import texturePackSlice from "@src/feature/texturePackSlice";

export const store = configureStore({
  reducer: {
    activeSidebarPanel: activeSidebarPanelSlice,
    texturePack: texturePackSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
