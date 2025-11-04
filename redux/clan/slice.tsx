import { createSlice } from '@reduxjs/toolkit';
import { createClan, deleteClan, getClans } from './operation';
import { ClanColor } from './colors';

export interface Clan {
  _id: string;
  server: string;
  clanName: string;
  charId: string;
  leaderCharNick: string;
  clanColor: ClanColor;
  logo: string;
  leaderId: string;
  members: string[];
  clanChars: string[];
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
    charId: '',
    leaderCharNick: '',
    clanName: '',
    clanColor: 'gray',
    logo: '',
    leaderId: '',
    members: [],
    clanChars: [],
  },
  loading: false,
  error: null,
  clans: [],
};

const clanSlice = createSlice({
  name: 'clan',
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
        state.clans = action.payload;
      })
      .addCase(getClans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteClan.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClan.fulfilled, (state, action) => {
        state.loading = false;
        state.clans = state.clans.filter(clan => clan._id !== action.payload);
      })
      .addCase(deleteClan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default clanSlice.reducer;
