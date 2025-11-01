export const selectChar = state => state.char.charData;
export const selectUserChars = state => state.char?.characters || [];
export const selectIsLoading = state => state.char.loading;
