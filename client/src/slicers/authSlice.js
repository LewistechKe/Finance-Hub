import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

export const authSlice = createSlice({
   name: "auth",
   initialState: {
      user: null,
      isAuthenticated: false,
      errors: null,
      token: null,
   },
   reducers: {
      setUser: (state, action) => {
         state.user = action.payload ? jwt_decode(action.payload) : null;
         state.isAuthenticated = action.payload ? true : false;
         state.token = action.payload || null;
      },
      setErrors: (state, action) => {
         state.errors = action.payload;
      },
      changeRole: (state, action) => {
         state.user.role = action.payload;
      },
   },
});

export const { setUser, setErrors, changeRole } = authSlice.actions;

export default authSlice.reducer;
