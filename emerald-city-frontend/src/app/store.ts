import { configureStore } from "@reduxjs/toolkit";

import activeSidebarPanelSlice from "@src/feature/activeSidebarPanel";

export const store = configureStore({
  reducer: {
    activeSidebarPanel: activeSidebarPanelSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
