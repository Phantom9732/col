import { defineStore } from 'pinia'
import { computed, ref, watch, type Ref } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites: Ref<Set<number>> = ref(
    new Set(JSON.parse(localStorage.getItem('favorites_shop_items') || '[]')),
  )

  watch(favorites.value, state => {
    console.log('changed', state)
    localStorage.setItem(
      'favorites_shop_items',
      JSON.stringify([...state.values()]),
    )
  })

  const addFavorite = (id: number) => {
    favorites.value.add(id)
  }

  const deleteFavorite = (id: number) => {
    favorites.value.delete(id)
  }

  const isInFavorites = (id: number) => {
    return favorites.value.has(id)
  }

  const toggleFavorite = (id: number) => {
    if (isInFavorites(id)) return deleteFavorite(id)
    return addFavorite(id)
  }

  const totalFavorites = computed(() => {
    return favorites.value.size
  })

  return {
    favorites,
    addFavorite,
    deleteFavorite,
    isInFavorites,
    toggleFavorite,
    totalFavorites,
  }
})
