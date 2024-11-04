import type { Product } from '@/api/shop.types'
import { useFavoritesStore } from '@/stores/favorites'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref([] as Product[])
  const isLoading = ref(true)
  const favorites = useFavoritesStore()

  const favoriteProducts = computed(() =>
    products.value.filter(prod => favorites.isInFavorites(prod.id)),
  )

  const productsByCategory = (catId: number) =>
    products.value.filter(prod => prod.category === catId)

  const related = computed(() => {
    return [...products.value].sort(() => 0.5 - Math.random()).slice(0, 4)
  })

  const productById = (productId: number) =>
    products.value.find(prod => prod.id === productId)

  const discounted = computed(() => {
    return products.value
      .filter(el => el.discount_price !== null)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4)
  })

  const getProductsByName = (name: string) => {
    if (name.trim().length === 0) return []
    return products.value.filter(prod =>
      prod.name.toLowerCase().includes(name.toLowerCase()),
    )
  }

  return {
    products,
    related,
    discounted,
    isLoading,
    favoriteProducts,
    productsByCategory,
    productById,
    getProductsByName,
  }
})
