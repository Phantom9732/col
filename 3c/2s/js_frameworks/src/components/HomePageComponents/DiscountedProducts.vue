<script setup lang="ts">
import SecondaryLayout from '@/components/SecondaryLayout.vue'
import ProductCard from '@/components/ProductCard.vue'
import { useProductsStore } from '@/stores/products'
const products = useProductsStore()
</script>

<template>
  <SecondaryLayout>
    <div :class="$style['wrapper']">
      <div :class="$style['heading']">Discounts up to -50%</div>
      <div :class="$style['products']">
        <ProductCard
          v-for="product in products.discounted"
          :key="product.id"
          :product
        />
      </div>
    </div>
  </SecondaryLayout>
</template>

<style module>
.wrapper {
  padding: 5rem 0 6.25rem;
}
.heading {
  font-family: var(--font-abeezee);
  font-size: 1.5rem;
  font-style: italic;
  margin-bottom: 2rem;
}
.products {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
</style>
