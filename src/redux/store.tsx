import { configureStore } from "@reduxjs/toolkit";
import { pokemonApi } from "./api/userApi";
import counterSlice from "./services/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
