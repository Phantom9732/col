<script lang="ts" setup>
import HeartIcon from '@/components/HeartIcon.vue'
import { useFavoritesStore } from '@/stores/favorites'

defineProps<{
  product: {
    id: number
    images: string[]
    name: string
  }
}>()
const favorites = useFavoritesStore()
</script>

<template>
  <div :class="$style['card']">
    <RouterLink :to="`/detail/${product.id}`" :class="$style['content']">
      <img :src="product.images?.[0]" alt="" :class="$style['image']" />
      <div :class="$style['info']">
        <div :class="$style['title']">
          {{ product.name }}
        </div>
        <div :class="$style['article']">#25139526913984</div>
      </div>
    </RouterLink>
    <button
      @click="favorites.toggleFavorite(product.id)"
      :class="$style['unfollow']"
    >
      <HeartIcon :active="favorites.isInFavorites(product.id)" />
    </button>
  </div>
</template>

<style module>
.card {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #9f9f9f;
  border-radius: 0.625rem;
  transition: transform 300ms;
}
.content {
  display: flex;
  gap: 1rem;
  align-items: center;
  text-decoration: none;
  color: #000;
}
.card:hover {
  transform: translateY(-0.2rem);
}
.image {
  max-height: 5.625rem;
}
.title {
  font-family: var(--font-abeezee);
  font-style: italic;
  font-size: 1rem;
  line-height: 1.5rem;
  margin-bottom: 0.5rem;
}
.article {
  font-family: var(--font-abel);
  font-size: 0.875rem;
  line-height: 1.5rem;
}
.unfollow {
  border: none;
  background: none;
  cursor: pointer;
  align-self: flex-start;
}
</style>
