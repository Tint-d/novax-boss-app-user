import { ReactNode } from "react";

export interface ChildrenType {
  children: ReactNode;
}
export interface CategoryType {
  boss_addresses_count: string;
  category_mm_name: string;
  category_name: string;
  id: number;
}
export interface MainCategoryType {
  categories: CategoryType[];
}
export interface Search {
  bossAddresses: {}[];
}
export interface CardType {
  boss_name: string;
  boss_no: string;
  business_address: string;
  business_category_id: string;
  business_city_id: string;
  business_logo: string;
  business_name: string;
  categories: Categories;
  city: { id: number; city_name: string; city_mm_name: string };
  id: number;
}

export interface Categories {
  id: number;
  category_mm_name: string;
  category_name: string;
}
export interface City {
  id: number;
  city_name: string;
  city_mm_name: string;
}
