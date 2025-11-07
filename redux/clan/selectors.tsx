import { RootState } from '../store';

export const selectClans = (state: RootState) => state.clan.clans;

export const selectClansLoading = (state: RootState) => state.clan.loading;

export const selectClansError = (state: RootState) => state.clan.error;
export const selectIsLiaderId = (state: RootState) => state.clan.clanData.leaderId;


export const selectCurrentClanId = (state: RootState) => state.clan.clanData._id;
export const selectCurrentClan = (state: RootState) => state.clan.currentClan;
export const selectClanMessage = (state: RootState, clanId: string) => {
  const clan = state.clan.clans.find(c => c._id === clanId);
  return clan?.message || '';
};
