import { configureStore } from '@reduxjs/toolkit';
import { contactsApi } from './contactsAPI';
import { userAPI } from './userAPI';
import { filter } from './filterSlice';
import { auth } from './authSlice';

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
  persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    filter,
    auth: persistReducer(authPersistConfig, auth),
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    contactsApi.middleware,
    userAPI.middleware,
  ],
});

export const persistor = persistStore(store);
export default store;
