import axios from 'axios';
import type { AllCategoriesResponse, AllProductsResponse, CategoryResponse, ProductResponse } from './backend.types';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  responseType: 'json',
});

export const getCategories = async () => {
  const { data } = await instance.get<AllCategoriesResponse>('/categories/all');
  return data;
};

export const getCategory = async (id: number) => {
  const { data } = await instance.get<CategoryResponse>(`/categories/${id}`);
  return data;
};

export const getProducts = async () => {
  const { data } = await instance.get<AllProductsResponse>('/products/all');
  return data;
};

export const getProduct = async (id: number) => {
  const { data } = await instance.get<ProductResponse>(`/products/${id}`);
  return data;
};
