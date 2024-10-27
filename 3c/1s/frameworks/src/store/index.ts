import { configureStore } from '@reduxjs/toolkit';
import { categoriesSlice } from './categories';
import { productsSlice } from './products';
import { cartSlice } from './cart';

export const store = configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
  },
});

store.subscribe(() => {
  localStorage.setItem('shop_cart', JSON.stringify(store.getState().cart));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
