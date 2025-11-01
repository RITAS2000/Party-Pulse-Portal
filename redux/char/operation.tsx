import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { store } from '../store';


export const getCharacter = createAsyncThunk(
  'auth/getCharacter',
    async (_, thunkAPI) => {
      const state = thunkAPI.getState() as ReturnType<typeof store.getState>;
        const token = state.auth.accessToken;
    try {
      
      const response = await axios.get('/party/char/collection', {
        headers: {
              Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message || 'Get error');
      }
      return thunkAPI.rejectWithValue('Get error');
    }
  }
);

export const createCharacter = createAsyncThunk(
  'auth/addCharacter',
    async (formData: { server: string; nickname: string; race: string; level: string; avatar: File }, thunkAPI) => {
      const state = thunkAPI.getState() as ReturnType<typeof store.getState>;
        const token = state.auth.accessToken;
    try {
        const data = new FormData();
        data.append("server", formData.server);
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

export const deleteCharacter = createAsyncThunk<
  string, // будемо повертати ID видаленого персонажа
  string, // передаємо ID персонажа
  { rejectValue: string }
    >('char/deleteCharacter', async (characterId, thunkAPI) => {
    const state = thunkAPI.getState() as ReturnType<typeof store.getState>;
        const token = state.auth.accessToken;
  try {
    await axios.delete(`/party/char/${characterId}`, {
        headers: {
              Authorization: `Bearer ${token}`,
        }
      });
    return characterId; 
  } catch (error: unknown) {
       if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message || 'Delete error');
      }
      return thunkAPI.rejectWithValue('Delete error'); 
    }
    
});