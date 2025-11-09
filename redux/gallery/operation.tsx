import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { store } from '../store';

export const addCharacterToGallery = createAsyncThunk(
  'gallery/addCharacter',
    async (charId: string, thunkAPI) => {
      
    const state = thunkAPI.getState() as ReturnType<typeof store.getState>;
    const token = state.auth.accessToken;
    try {
      const response = await axios.post(
        '/party/gallery/add',
        { charId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message || 'Add');
      }
      return thunkAPI.rejectWithValue('Add error');
    }
  }
);

export const fetchGallery = createAsyncThunk(
  "gallery/fetchGallery",
    async (_, thunkAPI) => {
      
        const state = thunkAPI.getState() as ReturnType<typeof store.getState>;
    const token = state.auth.accessToken;
    try {
      const response = await axios.get("/party/gallery", {
        headers: { Authorization: `Bearer ${token}` },
      });
        return response.data
        
      } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message || 'Gallery error');
      }
      return thunkAPI.rejectWithValue('Gallery error');
    };
   
  }
);