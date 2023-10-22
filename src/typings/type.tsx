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

export interface FormStateType {
  [key: string]: string;
}

export interface StateContextType {
  textToggle: boolean;
  setTextToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface InitialStateType {
  textToggle: boolean;
  textToggle2: boolean;
}

export enum ChangeAction {
  TogglePassword = "TOGGLE_PASSWORD",
  TogglePasswordConfirmation = "TOGGLE_PASSWORD_CONFIRMATION",
}

export interface ActionType {
  type: ChangeAction;
}

export interface BossType {
  boss_name: string;
  boss_no: string;
  business_address: string;
  business_category_id: string;
  business_city_id: string;
  business_description: string;
  business_logo: string;
  business_name: string;
  categories: {
    category_mm_name: string;
    category_name: string;
    id: string;
  };
  city: {
    city_mm_name: string;
    city_name: string;
    id: string;
  };
  cover_photo: string;
  id: string;
}

// Now you can use the 'Boss' type in your code
