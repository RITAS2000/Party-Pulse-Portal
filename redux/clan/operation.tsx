import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '../store';

export const createClan = createAsyncThunk(
  'auth/addClan',
    async (formData: { server: string; clanName: string; charId: string; leaderCharNick: string, clanColor: string,  logo: File }, thunkAPI) => {
      const state = thunkAPI.getState() as ReturnType<typeof store.getState>;
        const token = state.auth.accessToken;
    try {
        const data = new FormData();
        data.append("server", formData.server);
        data.append("clanName", formData.clanName);
        data.append("charId", formData.charId)
        data.append("leaderCharNick", formData.leaderCharNick)
        data.append("clanColor", formData.clanColor);
        
        
    
      if (formData.logo) {
        data.append("logo", formData.logo);
      }

      const response = await axios.post('/party/clan/add', data, {
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

export const getClans = createAsyncThunk(
  "clan/getClans",
  async (_, thunkAPI) => {
    
    const state = thunkAPI.getState() as ReturnType<typeof store.getState>;
    const token = state.auth?.accessToken;

    try {
      const response = await axios.get("/party/clan", {
          headers: {
              Authorization: `Bearer ${token}`,
        }
      });
      return response.data; 
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message || "Get error");
      }
      return thunkAPI.rejectWithValue("Get error");
    }
  }
);
export const deleteClan = createAsyncThunk<
  string, 
  string, 
  { rejectValue: string }
>(
  "clan/deleteClan",
  async (clanId, thunkAPI) => {
    
    const state = thunkAPI.getState() as ReturnType<typeof store.getState>;
    const token = state.auth?.accessToken;

    try {
      const response = await axios.delete(`/party/clan/${clanId}`, {
          headers: {
              Authorization: `Bearer ${token}`,
        }
      });
      return response.data; 
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message || "Delete error");
      }
      return thunkAPI.rejectWithValue("Delete error");
    }
  }
);