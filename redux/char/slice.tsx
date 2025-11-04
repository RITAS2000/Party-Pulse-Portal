import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createCharacter, deleteCharacter, getAllCharacters, getCharacter, getCharacterById } from './operation';
export interface Character {
  _id: string;
  server: string;
  nickname: string;
  race: string;
  level: number;
  avatar: string | null;
  clanId: string;
}
interface CharState {
  charData: {
    _id: string;
    server: string;
    nickname: string;
    race: string;
    level: number;
    avatar: string | null;
    clanId: string;
  };
  loading: boolean;
  error: string | null;
  characters: Character[];
}
const initialState: CharState = {
  charData: {
    _id: '',
    server: '',
    nickname: '',
    race: '',
    level: 1,
    avatar: null,
    clanId: '',
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
        state.characters = Array.isArray(action.payload)
    ? action.payload
    : action.payload.characters || [];
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
    .addCase(getCharacterById.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getCharacterById.fulfilled, (state, action: PayloadAction<Character>) => {
  state.loading = false;
      state.charData = { ...action.payload };

})
    .addCase(getCharacterById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(getAllCharacters.pending, state => {
  state.loading = true;
  state.error = null;
})
.addCase(getAllCharacters.fulfilled, (state, action) => {
    state.characters = Array.isArray(action.payload)
        ? action.payload
        : [];
})
.addCase(getAllCharacters.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload as string;
})
  },
});
export const { updateCharacterLevel } = charSlice.actions;
export default charSlice.reducer;
