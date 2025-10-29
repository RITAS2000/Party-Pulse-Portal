import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from './operation';

interface AuthState {
  userData: null | {
    username: string,
    email: string,
    role?: string,
    clanId?: string,
    isAdmin?: boolean,
  };
  loading: boolean;
  error: string | null;
  isRegistered: boolean;
}
const initialState: AuthState = {
  userData: null,
  loading: false,
  error: null,
  isRegistered: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// export const { setRegistared } = authSlice.actions;
export default authSlice.reducer;
