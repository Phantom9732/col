<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue'
import SecondaryLayout from '@/components/SecondaryLayout.vue'
import { useProductsStore } from '@/stores/products'
const products = useProductsStore()
</script>

<template>
  <SecondaryLayout>
    <div :class="$style.container">
      <h3 :class="$style.title">Related Products</h3>
      <div :class="$style.products">
        <ProductCard
          v-for="product in products.related"
          :key="product.id"
          :product
        />
      </div>
    </div>
  </SecondaryLayout>
</template>

<style module>
.container {
  padding: 5rem 0;
}
.title {
  font-family: var(--font-abeezee);
  font-size: 1.5rem;
  line-height: 2rem;
  color: black;
  margin-bottom: 2rem;
}
.products {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
</style>
