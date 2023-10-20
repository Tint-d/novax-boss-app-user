import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://novax-mm.com/api/v1/user/auth",
  }),
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    userRegister: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    userFotgetPassword: builder.query({
      query: (email: string) => {
        console.log("Email in query function:", email); // Log the email
        return { url: `/forgot-password?email=${email}` };
      },
      providesTags: ["Auth"],
    }),

    userResetPassword: builder.mutation({
      query: () => ({
        url: "/reset-password",
      }),
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserRegisterMutation,
  useUserFotgetPasswordQuery,
} = authApi;
