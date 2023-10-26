import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// interface User {
//   id: number;
//   username: string;
//   // other user properties
// }

interface AuthType {
  user: null;
  token: string;
}

const initialState: AuthType = {
  user: null,
  token: "",
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      console.log(payload);

      state.user = payload.data.user;
      state.token = payload.data.token;
      Cookies.set("token", state.token, { expires: 30 });
      Cookies.set("user", JSON.stringify(state.user), { expires: 30 });
    },
    removeUser: (state) => {
      state.user = null;
      state.token = "";
      Cookies.remove("token");
      Cookies.remove("user");
    },
  },
});

export const { addUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
