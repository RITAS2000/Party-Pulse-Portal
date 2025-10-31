import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
 
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
  localStorage.removeItem('persist:token');
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData: { username: string; email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post('/party/auth/register', formData,  {
  headers: {
    'Content-Type': 'application/json'
  }
});
      console.log('📦 Дані з сервера:', response.data);
      return response.data;
    } catch (error: unknown) {
       if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message || 'Registration error');
      }
      return thunkAPI.rejectWithValue('Registration error');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData: {email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post('/party/auth/login', formData,  {
  headers: {
    'Content-Type': 'application/json'
  }
});
      console.log('📦 Дані з сервера:', response.data);
      return response.data;
    } catch (error: unknown) {
       if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message || 'Login error');
      }
      return thunkAPI.rejectWithValue('Login error');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState; 
    const token = state.auth.accessToken;

    await axios.post(
      '/party/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    clearAuthHeader();
    return;
  } catch (error: unknown) {
    clearAuthHeader();
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message || 'Logout error');
      }
      return thunkAPI.rejectWithValue('Logout error');
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, thunkAPI) => {
    try {
      const response = await axios.post("/party/auth/forgot-password", { email });
      return response.data;
    } catch (error: unknown) {
       if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message || 'Sending error');
      }
      return thunkAPI.rejectWithValue('Sending error');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (
    { token, password }: { token: string; password: string },
    thunkAPI
  ) => {
    try {
  const res = await axios.post(
  '/party/auth/reset-password',
  { token, password},
  { headers: { 'Content-Type': 'application/json' }}
);
      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message || 'Reset password error');
      }
      return thunkAPI.rejectWithValue('Reset password error');
    }
  }
);