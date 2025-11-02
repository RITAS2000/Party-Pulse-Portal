import { createSlice } from '@reduxjs/toolkit';
import { createClan, getClans } from './operation';
import { ClanColor } from './colors';



export interface Clan {
  _id: string;
  server: string;
  clanName: string;
  clanColor: ClanColor;
  logo: string;
  leaderId: string;
  members: string[];
}


interface ClanState {
  clanData: Clan;
  loading: boolean;
  error: string | null;
  clans: Clan[];
}


const initialState: ClanState = {
  clanData: {
    _id: '',
    server: '',
    clanName: '',
    clanColor: 'gray',
    logo: '',
    leaderId: '',
    members: [],
  },
  loading: false,
  error: null,
  clans: [],
};

const clanSlice = createSlice({
  name: 'char',
  initialState,

  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createClan.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClan.fulfilled, (state, action) => {
        state.loading = false;
        state.clanData = action.payload;
      })
      .addCase(createClan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getClans.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClans.fulfilled, (state, action) => {
        state.loading = false;
        state.clans = action.payload; // масив кланів з сервера
      })
      .addCase(getClans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default clanSlice.reducer;
