import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const api_uri = process.env.REACT_APP_API_URL;

const initialState = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated: false,
  user: null,
};

// Async thunk for loading user
export const loadUser = createAsyncThunk('auth/loadUser', async (_, { rejectWithValue }) => {
  try {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json',
        },
      };

      const res = await axios.get(`${api_uri }/auth/user/me/`, config);
      return res.data;
    } else {
      throw new Error('No access token found');
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async thunk for login
export const login = createAsyncThunk('auth/login', async ({ username, password }, { rejectWithValue }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ username, password });

  try {
    const res = await axios.post(`${api_uri }/auth/jwt/create/`, body, config);
    localStorage.setItem('access', res.data.access);
    localStorage.setItem('refresh', res.data.refresh);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Create the auth slice using createSlice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Logout reducer
    logout(state) {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      state.access = null;
      state.refresh = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // Load user reducers
    builder
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loadUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });

    // Login reducer
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
      })
      .addCase(login.rejected, (state) => {
        state.isAuthenticated = false;
        state.access = null;
        state.refresh = null;
      });
  },
});

// Export the auth actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
