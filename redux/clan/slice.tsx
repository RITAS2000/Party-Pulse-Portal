import { createSlice } from '@reduxjs/toolkit';
import { createClan, deleteClan, fetchClanMessage, getClanById, getClans } from './operation';
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
  message: string;
    
}

interface ClanState {
  clanData: Clan;
  loading: boolean;
  error: string | null;
    clans: Clan[];
    currentClan: Clan | null,
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
    message: "",
    
  },
  loading: false,
  error: null,
    clans: [],
    currentClan: null,
};

const clanSlice = createSlice({
  name: 'clan',
  initialState,

  reducers: {updateMessage: (state, action) => {
  const { clanId, message } = action.payload;
  state.clans = state.clans.map(clan =>
    clan._id === clanId ? { ...clan, message } : clan
  );
}},
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
      }).addCase(getClanById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClanById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentClan = action.payload;
      })
      .addCase(getClanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
    .addCase(fetchClanMessage.fulfilled, (state, action) => {
  const { clanId, message } = action.payload;
  const clan = state.clans.find(c => c._id === clanId);
  if (clan) clan.message = message;

  if (state.currentClan && state.currentClan._id === clanId) {
    state.currentClan.message = message;
  }
});;
  },
});

export default clanSlice.reducer;
