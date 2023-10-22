import { configureStore } from "@reduxjs/toolkit";
import { businessAddressApi } from "./api/BusinessAddressApi";
import { authApi } from "./api/authApi";
import { facebookAuthApi } from "./api/facebookApi";
import businessSlice from "./services/businessSlice";

export const store = configureStore({
  reducer: {
    business: businessSlice,
    [authApi.reducerPath]: authApi.reducer,
    [businessAddressApi.reducerPath]: businessAddressApi.reducer,
    [facebookAuthApi.reducerPath]: facebookAuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      facebookAuthApi.middleware,
      businessAddressApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
