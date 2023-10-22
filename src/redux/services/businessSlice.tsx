import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../store";

// interface CounterState {
//   value: number;
// }

const initialState = {
  business: [],
};

export const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    addBusiness: (state, { payload }) => {
      state.business = payload;
    },
  },
});

export const { addBusiness } = businessSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value;

export default businessSlice.reducer;
