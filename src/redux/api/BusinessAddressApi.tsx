import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BossType, MainCategoryType } from "../../typings/type";
// import { CategoryType } from "../../utils/Navbar";
import Cookies from "js-cookie";
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

export const enum BossFilterType {
  CATEGORY = "category",
  CITY = "city",
  DEFAULT = "default",
}

const token = Cookies.get("token");

export const businessAddressApi = createApi({
  reducerPath: "businessAddress",
  tagTypes: ["businessAddress"],
  baseQuery: fetchBaseQuery({ baseUrl: window.getUrl("/v1/user/") }),
  endpoints: (builder) => ({
    getBusinessAddress: builder.query<BusinessAddressResponse,{ page: number }>({
      query: ({ page }) => `/boss-address/list?page=${page}`,
    }),
    getBusinessAddressFilter: builder.query<BusinessAddressResponse,{ type: BossFilterType,id:string, page: number ,search?: string}>({
      query: ({ page ,type,id ,search = ""}) => {
        if(type == BossFilterType.CATEGORY){
          return `/boss-address/list?page=${page}&category_id=${id}&search=${search}`;
        }else if(type == BossFilterType.CITY){
          return `/boss-address/list?page=${page}&city_id=${id}&search=${search}`;
        }else{
          return `/boss-address/list?page=${page}&search=${search}`;
        }
      },
    }),
    getBusinessAddressDetail: builder.query<unknown, string>({
      query: (id) => `/boss-address/view/${id}?withUser`,
    }),
    getCategories: builder.query<MainCategoryType, void>({
      query: () => `categories/list?address_count=true`,
    }),
    searchCategories: builder.query<unknown, unknown>({
      query: (name: string) => `/boss-address/list?search=${name}`,
    }),
    getCountry: builder.query<CityResponseType, void>({
      query: () => `/cities/list`,
    }),
    createBossAddress: builder.mutation({
      query: ( data ) => ({
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
      query: ( data ) => ({
        url: "action-code/apply",
        method: "POST",
        body: data,
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["businessAddress"],
    }),
    getProfile: builder.query<unknown, unknown>({
      // v1/user/profile/me?withAddress=true
      query: () => ({
        url: "/profile/me?withAddress=true",
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
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
  useGetProfileQuery,
  useGetBusinessAddressFilterQuery,
} = businessAddressApi;
