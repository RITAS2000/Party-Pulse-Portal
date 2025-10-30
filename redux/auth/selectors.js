export const selectAuth = state => state.auth;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRegistered = state => state.auth.isRegistered;
export const selectUserData = state => state.auth.userData;
export const selectAccessToken = state => state.auth.accessToken;
export const selectIsAdmin = state => state.auth.userData?.role === 'admin';
