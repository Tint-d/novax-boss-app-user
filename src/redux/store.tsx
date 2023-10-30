import { configureStore } from "@reduxjs/toolkit";
import { businessAddressApi } from "./api/BusinessAddressApi";
import { authApi } from "./api/authApi";
import { facebookAuthApi } from "./api/facebookApi";
import businessSlice from "./services/businessSlice";
import authSlice from "./services/authSlice";
import { settingSlice } from "./services/settinSlice";
import { profileApi } from "./api/profile";
import { supportMessage } from "./api/supportMessageApi";

export const store = configureStore({
  reducer: {
    setting : settingSlice.reducer,
    business: businessSlice,
    authSlice: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [businessAddressApi.reducerPath]: businessAddressApi.reducer,
    [facebookAuthApi.reducerPath]: facebookAuthApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [supportMessage.reducerPath]: supportMessage.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      facebookAuthApi.middleware,
      businessAddressApi.middleware,
      profileApi.middleware,
      supportMessage.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
