import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '../store';
import { Clan } from "./slice";

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


export const getClanById = createAsyncThunk<
  Clan, 
  string, 
  { rejectValue: string }
>(
  "clan/getClanById",
  async (clanId, thunkAPI) => {
    
    const state = thunkAPI.getState() as ReturnType<typeof store.getState>;
    const token = state.auth?.accessToken;

    try {
      const response = await axios.get(`/party/clan/${clanId}`, {
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


export const upsertClanMessage = createAsyncThunk(
  'clan/upsertMessage',
  async (payload: { clanId: string; message: string }, thunkAPI) => {
    const state = thunkAPI.getState() as ReturnType<typeof store.getState>;
    const token = state.auth.accessToken;

    try {
      const response = await axios.patch('/party/clan/add-message', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('📦 Дані з сервера:', response.data);
      return response.data.message;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message || 'Upsert error');
      }
      return thunkAPI.rejectWithValue('Upsert error');
    }
  }
);


export const fetchClanMessage = createAsyncThunk(
  'clan/fetchMessage',
  async (clanId: string, thunkAPI) => {
    const state = thunkAPI.getState() as ReturnType<typeof store.getState>;
    const token = state.auth.accessToken;

    try {
      const response = await axios.get(`/party/clan/${clanId}/message`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('📦 Дані з сервера:', response.data);
      return response.data.message;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message || 'Fetch error');
      }
      return thunkAPI.rejectWithValue('Fetch error');
    }
  }
);
interface AddCharPayload {
  charId: string;
  clanId: string;
}
export const addCharToClan = createAsyncThunk(
  'clan/addChar',
  async (payload: AddCharPayload, thunkAPI) => {
    const state = thunkAPI.getState() as ReturnType<typeof store.getState>;
    const token = state.auth.accessToken;

    try {
      const response = await axios.patch(
        `/party/clan/add-char`,
        {
          charId: payload.charId,
          clanId: payload.clanId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log('📦 Дані з сервера:', response.data);
      return response.data.message; // "Character added to clan successfully!" або твій тост
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Add character error');
      }
      return thunkAPI.rejectWithValue('Add character error');
    }
  }
);
interface AcceptCharPayload {
  charId: string;
  clanId: string;
}
export const acceptCharToClan = createAsyncThunk(
  'clan/acceptChar',
  async (payload: AcceptCharPayload, thunkAPI) => {
    const state = thunkAPI.getState() as ReturnType<typeof store.getState>;
    const token = state.auth.accessToken;

    try {
      const response = await axios.patch(
        `/party/clan/accept-char`,
        {
          charId: payload.charId,
          clanId: payload.clanId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log('📦 Дані з сервера:', response.data);
      return response.data; 
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Accept character error');
      }
      return thunkAPI.rejectWithValue('Accept character error');
    }
  }
);

export const notAcceptCharToClan = createAsyncThunk(
  'clan/notAcceptChar',
  async (payload: AcceptCharPayload, thunkAPI) => {
     const state = thunkAPI.getState() as ReturnType<typeof store.getState>;
    const token = state.auth.accessToken;
  

    try {
      const response = await axios.delete(
        `/party/clan/not-accept-char`, {
        data: {
          charId: payload.charId,
          clanId: payload.clanId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },

      } );

      console.log('📦 Дані з сервера:', response.data);
      return response.data; 
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Accept character error');
      }
      return thunkAPI.rejectWithValue('Accept character error');
    }
  }
);


export const addOfficer = createAsyncThunk(
  'clan/addOfficer',
  async (payload: AcceptCharPayload, thunkAPI) => {
    const state = thunkAPI.getState() as ReturnType<typeof store.getState>;
    const token = state.auth.accessToken;

    try {
      const response = await axios.patch(
        `/party/clan/add-officer`,
        {
          charId: payload.charId,
          clanId: payload.clanId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log('📦 Дані з сервера:', response.data);
      return response.data; 
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Add officer error');
      }
      return thunkAPI.rejectWithValue('Add officer error');
    }
  }
);

export const removeOfficer = createAsyncThunk(
  "clan/removeOfficer",
  async (payload: AcceptCharPayload, thunkAPI) => {
    const state = thunkAPI.getState() as ReturnType<typeof store.getState>;
    const token = state.auth.accessToken;

    try {
      const response = await axios.patch(
        `/party/clan/remove-officer`,
        {
          charId: payload.charId,
          clanId: payload.clanId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || "Remove officer error"
        );
      }
      return thunkAPI.rejectWithValue("Remove officer error");
    }
  }
);

interface transferLeaderCharPayload {
  newLeaderCharId: string;
  clanId: string;
}
export const transferLeadership = createAsyncThunk(
  "clan/transferLeadership",
  async (payload: transferLeaderCharPayload, thunkAPI) => {
    const state = thunkAPI.getState() as ReturnType<typeof store.getState>;
    const token = state.auth.accessToken;

    try {
      const response = await axios.patch(
        `/party/clan/transferLeadership`,
        {
          newLeaderCharId: payload.newLeaderCharId,
          clanId: payload.clanId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || "Remove officer error"
        );
      }
      return thunkAPI.rejectWithValue("Remove officer error");
    }
  }
);



