<script lang="ts" setup>
import HeartIcon from '@/components/HeartIcon.vue'
import Button from '@/components/ui/Button.vue'
import { useCartStore } from '@/stores/cart'
import { useFavoritesStore } from '@/stores/favorites'
import { useToast } from 'vue-toast-notification'
defineProps<{
  product: {
    id: number
    name: string
    discount_price: null | number
    price: string | number
    images: string[]
  }
}>()
const favorites = useFavoritesStore()
const toast = useToast()
const cart = useCartStore()

const handleAdd = (id: number) => {
  toast.success('Added to cart')
  cart.addToCart(id)
}
</script>

<template>
  <RouterLink :to="`/detail/${product.id}`" :class="$style['card']">
    <button
      @click.prevent="favorites.toggleFavorite(product.id)"
      :class="[$style['favorite']]"
    >
      <HeartIcon
        :active="favorites.isInFavorites(product.id)"
        :class="$style['favorite-image']"
      />
    </button>
    <img :src="product.images?.[0]" alt="" :class="$style['image']" />
    <h5 :class="$style['title']">{{ product.name }}</h5>
    <div :class="$style['price']">
      ${{ product.discount_price || product.price }}
    </div>
    <Button @click.prevent="handleAdd(product.id)" medium>Buy Now </Button>
  </RouterLink>
</template>

<style module>
.card {
  background-color: #f6f6f6;
  border-radius: 0.563rem;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  &:link,
  &:visited {
    color: black;
  }
}
.favorite {
  align-self: flex-end;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.favorite-image {
  width: 2rem;
  height: 2rem;
}
.image {
  height: 10rem;
  object-fit: cover;
}
.title {
  font-family: var(--font-abeezee);
  font-size: 1rem;
  font-style: italic;
  text-align: center;
  line-height: 1.5rem;
}
.price {
  font-family: var(--font-abel);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}
</style>
