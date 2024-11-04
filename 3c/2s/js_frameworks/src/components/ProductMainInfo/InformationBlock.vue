<script lang="ts" setup>
import CharBlock from '@/components/ProductMainInfo/CharBlock.vue'
import PricesBlock from '@/components/ProductMainInfo/PricesBlock.vue'
import FeatureBlock from '@/components/ProductMainInfo/FeatureBlock.vue'
import Buttom from '@/components/ui/Button.vue'
import Rating from '@/components/ui/Rating.vue'
import type { Product } from '@/api/shop.types'
import { useFavoritesStore } from '@/stores/favorites'
import { useCartStore } from '@/stores/cart'
import { useToast } from 'vue-toast-notification'

defineProps<{ currentProduct: Product }>()
const favorite = useFavoritesStore()
const cart = useCartStore()
const toast = useToast()

const handleAdd = (id: number) => {
  toast.success('Added to cart')
  cart.addToCart(id)
}
</script>

<template>
  <div v-if="currentProduct" :class="$style.container">
    <h1 :class="$style.title">{{ currentProduct.name }}</h1>
    <div :class="$style.subtitle">
      <PricesBlock
        :current="`$${currentProduct.discount_price || currentProduct.price}`"
        :old="currentProduct.discount_price ? `$${currentProduct.price}` : ''"
      />
      <Rating
        :rating="currentProduct.rating"
        :reviews="currentProduct.count_review"
      />
    </div>
    <div :class="$style.characteristics">
      <CharBlock
        v-for="{
          characteristic: name,
          value,
        } in currentProduct.characteristics"
        :key="name"
        :name
        :value
      />
    </div>
    <div :class="$style.description">
      Enhanced capabilities thanks toan enlarged display of 6.7 inchesand work
      without rechargingthroughout the day. Incredible photosas in weak, yesand
      in bright lightusing the new systemwith two cameras more...
    </div>
    <div :class="$style.buttons">
      <Buttom
        full
        transparent="black"
        @click="favorite.toggleFavorite(currentProduct.id)"
        >{{
          favorite.isInFavorites(currentProduct.id) ? 'Remove from' : 'Add to'
        }}
        Wishlist</Buttom
      >
      <Buttom full @click="handleAdd(currentProduct.id)">Add to Card</Buttom>
    </div>
    <div :class="$style.features">
      <FeatureBlock icon="delivery" title="Free Delivery" value="1-2 day" />
      <FeatureBlock
        icon="stock"
        title="In Stock"
        :value="currentProduct.is_available ? 'Avalible' : 'Not Avalible'"
      />
      <FeatureBlock
        icon="guarantee"
        title="Guaranteed"
        :value="`${currentProduct.guarantee} Months`"
      />
    </div>
  </div>
</template>

<style module>
.container {
  align-self: flex-start;
}
.title {
  font-family: var(--font-abeezee);
  font-size: 2.5rem;
  font-weight: 400;
  font-style: italic;
  color: black;
  margin-bottom: 1.5rem;
}
.subtitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.characteristics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.description {
  font-family: var(--font-abel);
  font-size: 0.875rem;
  line-height: 1.5rem;
  margin-bottom: 2rem;
  color: #6c6c6c;
}
.buttons {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}
.features {
  display: flex;
  gap: 2rem;
}
</style>
