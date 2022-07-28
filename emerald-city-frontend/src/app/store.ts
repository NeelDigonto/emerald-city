import { configureStore } from "@reduxjs/toolkit";

import activeSidebarPanelSlice from "@src/feature/activeSidebarPanelSlice";
import texturePackSlice from "@src/feature/texturePackSlice";
import materialSlice from "@src/feature/materialSlice";
import importedMeshSlice from "@src/feature/importedMeshSlice";
import modelSlice from "@src/feature/modelSlice";

export const store = configureStore({
  reducer: {
    activeSidebarPanel: activeSidebarPanelSlice,
    texturePack: texturePackSlice,
    material: materialSlice,
    importedMeshes: importedMeshSlice,
    model: modelSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
