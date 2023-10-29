import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '@/redux/store';
import { Profile } from "@/utils/Navbar";

export interface InitialBusinessStateType {
    items: [];
    searchTerm: string;
    profile: Profile| [];
}

const initialState :InitialBusinessStateType  = {
  items: [],
  searchTerm: "",
  profile: [],
};

export const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    addBusiness: (state, { payload }) => {
      state.items = payload;
    },
    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
      // console.log(state.searchTerm);
    },
    addProfile: (state, { payload }) => {
      state.profile = payload;
    },
  },
});

export const { addBusiness, setSearchTerm, addProfile } = businessSlice.actions;

export const selectProfile = (state: RootState) => state.business.profile as Profile;

export default businessSlice.reducer;
