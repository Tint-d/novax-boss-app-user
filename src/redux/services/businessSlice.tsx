import { createSlice } from "@reduxjs/toolkit";

export interface InitialBusinessStateType {
  business: {
    items: [];
    searchTerm: string;
  };
}

const initialState = {
  items: [],
  searchTerm: "",
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
  },
});

export const { addBusiness, setSearchTerm } = businessSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value;

export default businessSlice.reducer;
