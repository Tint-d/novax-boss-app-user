import { configureStore } from "@reduxjs/toolkit";
import { businessAddress } from "./api/BusinessAddress";
import { pokemonApi } from "./api/userApi";
import counterSlice from "./services/counterSlice";
import { authApi } from "./api/authApi";
import { facebookAuthApi } from "./api/facebookApi";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [businessAddress.reducerPath]: businessAddress.reducer,
    [facebookAuthApi.reducerPath]: facebookAuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      facebookAuthApi.middleware,
      businessAddress.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
