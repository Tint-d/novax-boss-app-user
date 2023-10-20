import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const facebookAuthApi = createApi({
  reducerPath: "facebookAuthApi",
  tagTypes: ["FacebookAuth"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://novax-mm.com/api",
  }),
  endpoints: (builder) => ({
    userFacebookLogin: builder.query({
      query: () => ({ url: `auth/facebook/login` }),
      providesTags: ["FacebookAuth"],
    }),
  }),
});

export const { useUserFacebookLoginQuery } = facebookAuthApi;
