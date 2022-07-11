import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialSKUsState: string[] = [];

export const grnSlice = createSlice({
  name: "GRN",
  initialState: initialSKUsState,
  reducers: {
    addGRN: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    },
  },
});

export const { addGRN } = grnSlice.actions;

export default grnSlice.reducer;
