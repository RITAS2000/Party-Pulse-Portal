import { createSlice } from '@reduxjs/toolkit';
import { forgotPassword, loginUser, logout, registerUser, resetPassword } from './operation';

interface AuthState {
  userData: null | {
    userId: string,
    username: string,
    role?: string,
    clanId?: string,
    isAdmin?: boolean,
  };
  loading: boolean;
  error: string | null;
  isRegistered: boolean;
  isLoggedIn: boolean;
  accessToken: string | null;
  expiresIn: number | null;
}
const initialState: AuthState = {
  userData: null,
  loading: false,
  error: null,
  isRegistered: false,
  isLoggedIn: false,
  accessToken: null,
  expiresIn: null
   
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
      })
     .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.data.userData;
        state.accessToken = action.payload.data.accessToken;
        state.expiresIn = Date.now() + action.payload.data.expiresIn;
        state.isLoggedIn = true; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isLoggedIn = false; 
      })
    .addCase(logout.fulfilled, (state) => {
        state.userData = null;
        state.accessToken = null;
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, (state) => {
        state.userData = null;
        state.accessToken = null;
        state.isLoggedIn = false;
      })
      .addCase(forgotPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
      state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      })
     .addCase(resetPassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, state => {
       state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
