import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { store } from '../store';
import { Character } from './slice';


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
  string, 
  string, 
  { rejectValue: string }
    >('char/deleteCharacter', async (charId, thunkAPI) => {
    const state = thunkAPI.getState() as ReturnType<typeof store.getState>;
        const token = state.auth.accessToken;
  try {
    await axios.delete(`/party/char/${charId}`, {
        headers: {
              Authorization: `Bearer ${token}`,
        }
      });
    return charId; 
  } catch (error: unknown) {
       if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message || 'Delete error');
      }
      return thunkAPI.rejectWithValue('Delete error'); 
    }
    
    });

    export const getCharacterById = createAsyncThunk<
  Character,   
  string,     
  { rejectValue: string }
>('char/getCharById', async (charId, thunkAPI) => {
  const state = thunkAPI.getState() as ReturnType<typeof store.getState>;
  const token = state.auth.accessToken;
 console.log("🚀 ~ charId:", charId)
  try {
    const response = await axios.get(`/party/char/${charId}`, {
      
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; 
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.message || 'Get character error');
    }
    return thunkAPI.rejectWithValue('Get character error');
  }
});

export const getAllCharacters = createAsyncThunk<
  Character[],   
  void,          
  { rejectValue: string }
>(
  'char/getAllChars',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as ReturnType<typeof store.getState>;
    const token = state.auth.accessToken;

    try {
      const response = await axios.get('/party/char', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.result ; 
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message || 'Get characters error');
      }
      return thunkAPI.rejectWithValue('Get characters error');
    }
  }
);



export const getFreeChars = createAsyncThunk<
  Character[],  
  string,         
  { rejectValue: string } 
>(
  "char/getFreeChars",
  async (server, thunkAPI) => {
    const state = thunkAPI.getState() as ReturnType<typeof store.getState>;
    const token = state.auth.accessToken;

    try {
      const response = await axios.get(`/party/char/free?server=${server}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data; // ✅ масив персонажів без клану
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message || "Get free chars error");
      }
      return thunkAPI.rejectWithValue("Get free chars error");
    }
  }
);