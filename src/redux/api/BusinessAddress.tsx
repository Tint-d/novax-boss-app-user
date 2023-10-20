import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MainCategoryType } from "../../typings/type";
// import { CategoryType } from "../../utils/Navbar";

export const businessAddress = createApi({
  reducerPath: "businessAddress",
  tagTypes: ["businessAddress"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://novax-mm.com/api/v1/user" }),
  endpoints: (builder) => ({
    getBusinessAddress: builder.query<{}[], void>({
      query: () => `/boss-address/list`,
    }),
    getCategories: builder.query<MainCategoryType, void>({
      query: () => `categories/list?address_count=true`,
    }),
    searchCategories: builder.query<string, {}[]>({
      query: (name: string) => `/boss-address/list?search=${name}`,
    }),
    getCountry: builder.query<{}[], void>({
      query: () => `/cities/list`,
    }),
  }),
});

export const {
  useGetBusinessAddressQuery,
  useGetCategoriesQuery,
  useSearchCategoriesQuery,
  useGetCountryQuery,
} = businessAddress;
