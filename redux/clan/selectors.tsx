import { RootState } from '../store';

export const selectClans = (state: RootState) => state.clan.clans;

export const selectClansLoading = (state: RootState) => state.clan.loading;

export const selectClansError = (state: RootState) => state.clan.error;
