import  Cookies  from 'js-cookie';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const token = Cookies.get('token');

export const profileApi = createApi({
  reducerPath: "profileApi",
  tagTypes: ["profile"],
  baseQuery: fetchBaseQuery({
    baseUrl: window.getUrl('/v1/user/'),
  }),
  endpoints: (builder) => ({
    updateProfileInfo: builder.mutation({
      query: (body) => ({
        url: `/profile/update`,
        method: "POST",
        body,
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["profile"],
    }),
    updateProfilePhoto: builder.mutation({
      query: (body) => ({
        url: `/profile/upload/photo`,
        method: "POST",
        body,
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const { useUpdateProfileInfoMutation,useUpdateProfilePhotoMutation } = profileApi;
