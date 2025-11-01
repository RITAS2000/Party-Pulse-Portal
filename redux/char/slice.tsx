import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createCharacter, deleteCharacter, getCharacter } from './operation';
interface Character {
  _id: string;
  server: string;
  nickname: string;
  race: string;
  level: number;
  avatar: string | null;
}
interface CharState {
  charData: {
    server: string;
    nickname: string;
    race: string;
    level: string;
    avatar: string;
  };
  loading: boolean;
  error: string | null;
  characters: Character[];
}
const initialState: CharState = {
  charData: {
    server: '',
    nickname: '',
    race: '',
    level: '',
    avatar: '',
  },
  loading: false,
  error: null,
  characters: [],
};

const charSlice = createSlice({
  name: 'char',
  initialState,

  reducers: {
    updateCharacterLevel: (state, action: PayloadAction<{ id: string; level: number }>) => {
      const { id, level } = action.payload;
      const char = state.characters.find(c => c._id === id); // <-- тут characters, а не chars
      if (char) char.level = level;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createCharacter.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCharacter.fulfilled, (state, action) => {
        state.loading = false;
        state.charData = action.payload;
      })
      .addCase(createCharacter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCharacter.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCharacter.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload.characters || [];
      })
      .addCase(getCharacter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
    .addCase(deleteCharacter.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCharacter.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.characters = state.characters.filter(c => c._id !== action.payload);
      })
      .addCase(deleteCharacter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});
export const { updateCharacterLevel } = charSlice.actions;
export default charSlice.reducer;
