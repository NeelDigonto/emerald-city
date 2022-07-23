import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SidebarPanel } from "@src/types/Core";

export const activeSidebarPanelSlice = createSlice({
  name: "Acitve Sidebar",
  initialState: SidebarPanel.ModelImporter,
  reducers: {
    setActiveSidebarPanel: (state, action: PayloadAction<SidebarPanel>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setActiveSidebarPanel } = activeSidebarPanelSlice.actions;

export default activeSidebarPanelSlice.reducer;
