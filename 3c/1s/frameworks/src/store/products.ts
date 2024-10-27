import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Product } from '../api/backend.types';
import { ShopApi } from '../api';

type State = {
  data: Product[];
  status: 'idle' | 'pending' | 'success' | 'error';
  errorMessage: string | null;
};

const initialState: State = {
  data: [],
  status: 'idle',
  errorMessage: null,
};

export const fetchProducts = createAsyncThunk('/products/fetchAllProducts', ShopApi.getProducts);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.errorMessage = null;
        state.status = 'pending';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'error';
        state.errorMessage = action.error.message || 'unknown error';
      }),
});
