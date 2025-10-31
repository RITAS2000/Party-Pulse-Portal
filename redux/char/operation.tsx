import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@reduxjs/toolkit/query';
import axios from 'axios';
import { store } from '../store';


export const createCharacter = createAsyncThunk(
  'auth/addCharacter',
    async (formData: { nickname: string; race: string; level: string; avatar: File }, thunkAPI) => {
      const state = thunkAPI.getState() as ReturnType<typeof store.getState>;
        const token = state.auth.accessToken;
    try {
      const data = new FormData();
      data.append("nickname", formData.nickname);
      data.append("race", formData.race);
      data.append("level", formData.level);
      if (formData.avatar) {
        data.append("avatar", formData.avatar);
      }

      const response = await axios.post('/party/char/add', data, {
        headers: {
              Authorization: `Bearer ${token}`,
        }
      });

      console.log('📦 Дані з сервера:', response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message || 'Add error');
      }
      return thunkAPI.rejectWithValue('Add error');
    }
  }
);