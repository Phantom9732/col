import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Category } from '../api/backend.types';
import { ShopApi } from '../api';

type State = {
  data: Category[];
  status: 'idle' | 'pending' | 'success' | 'error';
  errorMessage: string | null;
};

const initialState: State = {
  data: [],
  status: 'idle',
  errorMessage: null,
};

export const fetchCategories = createAsyncThunk('/categories/getAllCategories', ShopApi.getCategories);

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'pending';
        state.errorMessage = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'error';
        state.errorMessage = action.error.message || 'unknown error';
      }),
});

export const { setCategories } = categoriesSlice.actions;
