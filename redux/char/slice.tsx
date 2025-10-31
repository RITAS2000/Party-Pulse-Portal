import { createSlice } from '@reduxjs/toolkit';
import { createCharacter } from './operation';

interface CharState {
  charData: {
    nickname: string;
    race: string;
    level: string;
    avatar: string;
  },
  loading: boolean;
  error: string | null;
  
}
const initialState: CharState = {
  charData: {
    nickname: '',
    race: '',
    level: '',
    avatar: '',
  },
  loading: false,
  error: null,
};

const charSlice = createSlice({
  name: 'char',
  initialState,

  reducers: {},
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
     
  },
});

export default charSlice.reducer;
