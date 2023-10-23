import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BossType, MainCategoryType } from "../../typings/type";
// import { CategoryType } from "../../utils/Navbar";

interface BusinessAddressResponse {
  bossAddresses: {
    data: BossType[];
    next_page_url: string | null;
  };
}

export const businessAddressApi = createApi({
  reducerPath: "businessAddress",
  tagTypes: ["businessAddress"],
  baseQuery: fetchBaseQuery({ baseUrl: getUrl("/user/") }),
  endpoints: (builder) => ({
    getBusinessAddress: builder.query<BusinessAddressResponse,{ page: number }>({
      query: ({ page }) => `/boss-address/list?page=${page}`,
    }),
    getCategories: builder.query<MainCategoryType, void>({
      query: () => `categories/list?address_count=true`,
    }),
    searchCategories: builder.query<any, any>({
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
} = businessAddressApi;
