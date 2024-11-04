<script lang="ts" setup>
import SecondaryLayout from '@/components/SecondaryLayout.vue'
import FavoriteCard from '@/components/Favorite/FavoriteCard.vue'
import { useProductsStore } from '@/stores/products'
const products = useProductsStore()
</script>

<template>
  <SecondaryLayout>
    <div :class="$style['wrapper']">
      <h2 :class="$style['heading']">Favorite</h2>
      <div :class="$style['items']">
        <FavoriteCard
          v-for="product in products.favoriteProducts"
          :key="product.id"
          :product
        />
      </div>
    </div>
  </SecondaryLayout>
</template>

<style module>
.wrapper {
  padding: 7rem 0;
}
.heading {
  font-family: var(--font-abel);
  font-size: 1.5rem;
  line-height: 1.5rem;
  margin-bottom: 2.5rem;
  font-weight: 400;
}
.items {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
</style>
