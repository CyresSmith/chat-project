import { createSlice } from '@reduxjs/toolkit';

const filtersInitialState = { filterValue: '' };

const filterSlice = createSlice({
  name: 'filterValue',
  initialState: filtersInitialState,
  reducers: {
    setFilterValue(state, action) {
      state.filterValue = action.payload;
    },
  },
});

export const { setFilterValue } = filterSlice.actions;
export const filter = filterSlice.reducer;
