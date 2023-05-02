import { createSlice } from '@reduxjs/toolkit';

export const authInitialState = {
  token: '',
  user: {
    name: '',
    email: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setAuth(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setAuth, setUser } = authSlice.actions;
export const auth = authSlice.reducer;
