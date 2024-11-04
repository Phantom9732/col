import type { Product, ServerProductsResponse } from '@/api/shop.types'
import axios from 'axios'

const categoryMap = {
  Аксессуары: 1,
  Гаджеты: 6,
  Компьютеры: 3,
  Планшеты: 4,
  Смартфоны: 2,
  Часы: 5,
}

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  responseType: 'json',
})

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await instance.get<ServerProductsResponse[]>('/products')
  return data.map(product => ({
    ...product,
    category: categoryMap[product.category as keyof typeof categoryMap],
    images: product.images.map(
      img => `${import.meta.env.VITE_BACKEND_URL}/${img}`,
    ),
  }))
}
