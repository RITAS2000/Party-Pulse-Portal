import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { store } from '../store';

interface GvgResponse {
  _id: string;
  territory: string;
  enemy: string;
  type: string;
  date: string; 
  time: string;
  clanId: string;
}

interface GvgPayload {
  territory: string;
  enemy: string;
  type: string;
  date: Date | null;
  time: string;
  clanId: string | undefined;
}
export const createGvg = createAsyncThunk<
  GvgResponse, 
  GvgPayload 
>(
  'gvg/createGvg',
    async (payload, thunkAPI) => {
      console.log("🚀 ~ payload:", payload)
      
    const state = thunkAPI.getState() as ReturnType<typeof store.getState>;
    const token = state.auth.accessToken;
    try {
      const response = await axios.post(
        '/party/gvg/create',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error: unknown) {
        console.error(error);
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message || 'Add error');
      }
      return thunkAPI.rejectWithValue('Add error');
    }
  }
);
