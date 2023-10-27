import { createSlice } from "@reduxjs/toolkit";

export interface InitialBusinessStateType {
  business: {
    items: [];
    searchTerm: string;
    profile: [];
  };
}

const initialState = {
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

// export const selectCount = (state: RootState) => state.counter.value;

export default businessSlice.reducer;
