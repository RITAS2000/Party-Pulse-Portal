import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
 
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

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
      console.error('❌ Інша помилка:', error);
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
      console.error('❌ Інша помилка:', error);
      return thunkAPI.rejectWithValue('Login error');
    }
  }
);