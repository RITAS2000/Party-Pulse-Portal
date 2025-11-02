import { RootState } from '@/redux/store';

export const selectGalleryIsLoading = (state: RootState) => state.gallery.isLoading;

export const selectGalleryError = (state: RootState) => state.gallery.error;

export const selectIsAdded =  (characterId: string) => (state: RootState)=>
  state.gallery.items.some(item => item.originalCharId === characterId);
export const selectGalleryItems = (state: RootState) => state.gallery.items;
