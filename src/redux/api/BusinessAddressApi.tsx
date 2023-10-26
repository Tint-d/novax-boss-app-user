import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BossType, MainCategoryType } from "../../typings/type";
// import { CategoryType } from "../../utils/Navbar";

interface BusinessAddressResponse {
  bossAddresses: {
    data: BossType[];
    next_page_url: string | null;
    prev_page_url: string | null;
  };
}

interface CityType {
  city_mm_name: string;
  city_name: string;
  id: number;
}

interface CityResponseType {
  cities: {
    data: CityType[];
  };
}

export const businessAddressApi = createApi({
  reducerPath: "businessAddress",
  tagTypes: ["businessAddress"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://novax-mm.com/api/v1/user" }),
  endpoints: (builder) => ({
    getBusinessAddress: builder.query<
      BusinessAddressResponse,
      { page: number }
    >({
      query: ({ page }) => `/boss-address/list?page=${page}`,
    }),
    getBusinessAddressDetail: builder.query<any, string>({
      query: (id) => `/boss-address/view/${id}?withUser`,
    }),
    getCategories: builder.query<MainCategoryType, void>({
      query: () => `categories/list?address_count=true`,
    }),
    searchCategories: builder.query<any, any>({
      query: (name: string) => `/boss-address/list?search=${name}`,
    }),
    getCountry: builder.query<CityResponseType, void>({
      query: () => `/cities/list`,
    }),
    createBossAddress: builder.mutation({
      query: ({ token, data }) => ({
        url: "/boss-address/create",
        method: "POST",
        body: data,
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["businessAddress"],
    }),
    createSocialLink: builder.mutation({
      query: ({ data, token, id }) => ({
        url: `/boss-address/update/${id}/add/social-links`,
        method: "POST",
        body: data,
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["businessAddress"],
    }),
    appliedCode: builder.mutation({
      query: ({ data, token }) => ({
        url: "action-code/apply",
        method: "POST",
        body: data,
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["businessAddress"],
    }),
  }),
});

export const {
  useGetBusinessAddressQuery,
  useGetCategoriesQuery,
  useSearchCategoriesQuery,
  useGetCountryQuery,
  useCreateBossAddressMutation,
  useCreateSocialLinkMutation,
  useGetBusinessAddressDetailQuery,
  useAppliedCodeMutation,
} = businessAddressApi;
