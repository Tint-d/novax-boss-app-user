import { configureStore } from "@reduxjs/toolkit";
import { businessAddress } from "./api/BusinessAddress";

export const store = configureStore({
  reducer: {
    [businessAddress.reducerPath]: businessAddress.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(businessAddress.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
