import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const facebookAuthApi = createApi({
  reducerPath: "facebookAuthApi",
  tagTypes: ["FacebookAuth"],
  baseQuery: fetchBaseQuery({
    baseUrl: getUrl('/user/'),
  }),
  endpoints: (builder) => ({
    userFacebookLogin: builder.query({
      query: () => ({
        url: `/auth/facebook`,
      }),
      providesTags: ["FacebookAuth"],
    }),
  }),
});

export const { useUserFacebookLoginQuery } = facebookAuthApi;
