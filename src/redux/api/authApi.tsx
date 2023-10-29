import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: window.getUrl('')
  }),
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (userData) => ({
        url: "v1/user/auth/login",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    userRegister: builder.mutation({
      query: (userData) => ({
        url: "v1/user/auth/register",
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
    userLogout: builder.mutation({
      query: (token) => ({
        url: `/logout`,
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["Auth"],
    }),
    userResetPassword: builder.mutation({
      query: () => ({
        url: "v1/user/auth/reset-password",
      }),
    }),
    userFacebookLogin: builder.mutation({
      query: () => ({
        url: "/auth/facebook/login",
        headers:{
          "Access-Control-Allow-Origin": "*",
          "withCredentials": "true",
        }
      }),
      invalidatesTags: ["Auth"],
    }),
    userFacebookLoginCallback : builder.query({
      query: (code : string) => ({
        url: "/auth/facebook/callback?code="+code,
        headers:{
          "Access-Control-Allow-Origin": "*",
          "withCredentials": "true",
        }
      }),
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserRegisterMutation,
  useUserFotgetPasswordQuery,
  useUserLogoutMutation,
  useUserFacebookLoginMutation,
  useUserFacebookLoginCallbackQuery,
} = authApi;

