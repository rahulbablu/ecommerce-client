import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUser } = AuthSlice.actions;
