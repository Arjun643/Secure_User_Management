// src/redux/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  loading: false,
};

// Thunks for login and registration
export const loginUserThunk = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://reqres.in/api/login', credentials);
      // Mock user data for example
      const user = { email: credentials.email, firstName: 'John', lastName: 'Doe', avatar: 'https://reqres.in/img/faces/1-image.jpg' };
      return { token: response.data.token, user };
    } catch (error) {
      return rejectWithValue('Login failed. Please check your credentials.');
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, firstName, lastName, avatar }: { email: string; password: string; firstName: string; lastName: string; avatar: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://reqres.in/api/register', { email, password });
      return { token: response.data.token, user: { email, firstName, lastName, avatar } };
    } catch (error) {
      return rejectWithValue('Registration failed. Please try again.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
    setUserEmail: (state, action) => {
      if (state.user) {
        state.user.email = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUserThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(registerUserThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout, setUserEmail } = authSlice.actions;
export default authSlice.reducer;
