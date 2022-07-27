import { configureStore } from "@reduxjs/toolkit";

import activeSidebarPanelSlice from "@src/feature/activeSidebarPanelSlice";
import texturePackSlice from "@src/feature/texturePackSlice";
import materialSlice from "@src/feature/materialSlice";
import importedModelSlice from "@src/feature/importedModelSlice";
import modelSlice from "@src/feature/modelSlice";
import geometrySlice from "@src/feature/geometrySlice";

export const store = configureStore({
  reducer: {
    activeSidebarPanel: activeSidebarPanelSlice,
    texturePack: texturePackSlice,
    material: materialSlice,
    importedModel: importedModelSlice,
    model: modelSlice,
    geometrySlice: geometrySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
