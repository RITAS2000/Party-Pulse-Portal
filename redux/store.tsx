import { configureStore, combineReducers } from '@reduxjs/toolkit';
import modalReducer from './modals/slice';
import authReducer from './auth/slice';
import langReducer from './lang/slice';
import charReduser from "./char/slice";
import clanReduser from "./clan/slice";
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import { galleryReducer } from './gallery/slice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['userData', 'accessToken', 'expiresIn', 'isLoggedIn'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Persist для lang slice
const langPersistConfig = {
  key: 'lang',
  storage,
  whitelist: ['locale'], // зберігаємо тільки locale
};

const persistedLangReducer = persistReducer(langPersistConfig, langReducer);

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'lang'], // тут перелік slice names, не полів
};

const rootReducer = combineReducers({
  clan: clanReduser,
  gallery: galleryReducer,
  char: charReduser,
  modal: modalReducer,
  auth: persistedAuthReducer,
  lang: persistedLangReducer,
});


const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// створюємо store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
