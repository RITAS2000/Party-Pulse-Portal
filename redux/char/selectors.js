export const selectChar = state => state.char.charData;
export const selectAllChars = state => state.char.characters
export const selectUserChars = state => state.char?.characters || [];
export const selectIsLoading = state => state.char.loading;
export const selectCharacterById = charId => state =>
  state.char.characters.find(c => c._id === charId);
