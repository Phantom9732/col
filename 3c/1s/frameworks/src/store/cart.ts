import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../api/backend.types';

export type CartProduct = {
  qty: number;
  data: Product;
};

type State = Record<string, CartProduct>;

const localState = JSON.parse(localStorage.getItem('shop_cart') || '""');

const initialState: State = localState || {};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ product: Product; qty?: number }>) => {
      const { product, qty } = action.payload;
      state[product.id] = {
        data: product,
        qty: (state[product.id]?.qty || 0) + (qty ?? 1),
      };
    },
    changeQty: (state, action: PayloadAction<{ productId: number; qty: number }>) => {
      const { productId, qty } = action.payload;
      state[productId].qty = qty;
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      delete state[action.payload];
    },
    incItem: (state, action: PayloadAction<number>) => {
      state[action.payload].qty += 1;
    },
    decItem: (state, action: PayloadAction<number>) => {
      if (state[action.payload]?.qty === 1) {
        delete state[action.payload];
      } else {
        state[action.payload].qty -= 1;
      }
    },
    clear: () => {
      return {};
    },
  },
});

export const cartActions = cartSlice.actions;
