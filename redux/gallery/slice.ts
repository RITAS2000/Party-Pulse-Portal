import { createSlice } from '@reduxjs/toolkit';
import { addCharacterToGallery, fetchGallery } from './operation';

interface CharacterInGallery {
  _id: string;
  originalCharId: string;
  userId: string;
  nickname: string;
  race: string;
  level: number;
  avatar: string;
  server: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

interface GalleryState {
  items: CharacterInGallery[];
  isLoading: boolean;
  error: string | null;
  isAdded: boolean;
}

const initialState: GalleryState = {
  items: [],
  isLoading: false,
  error: null,
  isAdded: false,
};

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    resetAddedState(state) {
      state.isAdded = false;
    },
    removeFromGallery(state, action) {
      state.items = state.items.filter(item => item._id !== action.payload);
      state.isAdded = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addCharacterToGallery.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.isAdded = false;
      })
      .addCase(addCharacterToGallery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
        state.isAdded = true;
      })
      .addCase(addCharacterToGallery.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAdded = false;
      })
      .addCase(fetchGallery.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGallery.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchGallery.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetAddedState, removeFromGallery } = gallerySlice.actions;
export const galleryReducer = gallerySlice.reducer;
