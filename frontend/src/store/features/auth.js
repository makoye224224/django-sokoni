// redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// API base URL
const baseURL = process.env.REACT_APP_API_URL;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // The authenticated user data
    loading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  logout,
} = authSlice.actions;

export default authSlice.reducer;