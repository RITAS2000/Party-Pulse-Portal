import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './operation';

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
  accessToken: string | null;
  expiresIn: number | null;
}
const initialState: AuthState = {
  userData: null,
  loading: false,
  error: null,
  isRegistered: false,
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
        state.accessToken = action.payload.accessToken;
        state.expiresIn = Date.now() + action.payload.expiresIn;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
