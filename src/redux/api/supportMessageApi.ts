import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const supportMessage = createApi({
  reducerPath: "supportMessageApi",
  tagTypes: ["supportMessage"],
  baseQuery: fetchBaseQuery({
    baseUrl: window.getUrl('/v1/user/'),
  }),
  endpoints: (builder) => ({
    getSupportQuestions: builder.query({
      query: () => ({
        url: `/support-message/questions`,
      }),
      providesTags: ["supportMessage"],
    }),
    getSupportAnswer: builder.query({
      query: (code) => ({
        url: `/support-message/answers?support_code=`+code,
      }),
      providesTags: ["supportMessage"],

    }),
  }),
});

export const { useGetSupportAnswerQuery,useGetSupportQuestionsQuery } = supportMessage;
