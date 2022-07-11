import { configureStore } from "@reduxjs/toolkit";

import grnSlice from "@src/feature/grnSlice";

export const store = configureStore({
  reducer: {
    grn: grnSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
