import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: 0,
    nik: "",
    name: "",
    role: "",
    isLogin: false,
    token: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    logout: (state) => {
      state.value = {
        id: 0,
        nik: "",
        name: "",
        role: "",
        isLogin: false,
        token: "",
      };
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
