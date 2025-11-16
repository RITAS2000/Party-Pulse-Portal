import { createSlice } from '@reduxjs/toolkit';
import { createGvg } from './operation';

export interface Gvg {
  _id: string;
  clanId: string;
  territory: string;
  enemy: string;
  date: string;
  time: string;
  attackOrDefense?: string;
  safeZone?: Array<{ characterId: string; order: number }>;
}

interface GvgState {
  gvgs: Gvg[];
  isLoading: boolean;
  error: string | null;
}

const initialState: GvgState = {
  gvgs: [],
  isLoading: false,
  error: null,
};
const gvgSlice = createSlice({
  name: 'gvg',
  initialState,
  reducers: {
    // Тут можна додавати синхронні редюсери, якщо знадобляться
    resetGvgs(state) {
      state.gvgs = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGvg.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createGvg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gvgs.push(action.payload);
      })
      .addCase(createGvg.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload  as string;
      });
  },
});

export const { resetGvgs } = gvgSlice.actions;




export default gvgSlice.reducer;