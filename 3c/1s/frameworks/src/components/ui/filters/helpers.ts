import type { Product } from '../../../api/backend.types';

export type FiltersState = {
  from: number | null;
  to: number | null;
  isDiscount: boolean;
  sortBy: string;
};

export type FilterName = 'range' | 'discount' | 'sort';

export const baseFilterState: FiltersState = {
  from: null,
  to: null,
  isDiscount: false,
  sortBy: 'default',
};

export const sortBy = (products: Product[], state: FiltersState, filters: FilterName[]) => {
  let result: Product[] = [...products];
  const { from, to, isDiscount, sortBy } = state;

  if (filters.includes('range')) {
    result = result.filter((product) => (from === null || product.price > from) && (to === null || product.price < to));
  }
  if (filters.includes('discount')) {
    result = result.filter((product) => (!isDiscount ? product : product.discont_price !== null));
  }

  if (filters.includes('sort') && sortBy !== 'default') {
    result.sort((a, b) => {
      if (sortBy === 'new') {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
      if (sortBy === 'priceAsc') {
        return b.price - a.price;
      }
      if (sortBy === 'priceDesc') {
        return a.price - b.price;
      }
      return a.id - b.id;
    });
  }

  return result;
};
