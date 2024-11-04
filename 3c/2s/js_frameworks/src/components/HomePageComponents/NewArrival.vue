<script lang="ts" setup>
import ProductCard from '@/components/ProductCard.vue'
import SecondaryLayout from '@/components/SecondaryLayout.vue'
import { useProductsStore } from '@/stores/products'
import { computed, ref, type Ref } from 'vue'
type SortType = 'new' | 'rating' | 'discount'
const sortType: Ref<SortType> = ref('new')
const products = useProductsStore()
const filtered = computed(() => {
  if (sortType.value === 'new') {
    return [...products.products].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  }
  if (sortType.value === 'discount') {
    return products.products.filter(prod => prod.discount_price !== null)
  }
  if (sortType.value === 'rating') {
    return [...products.products].sort((a, b) => b.rating - a.rating)
  }
  return []
})
</script>

<template>
  <SecondaryLayout>
    <div :class="$style['wrapper']">
      <div :class="$style['tabs']" id="tabs">
        <div
          @click="sortType = 'new'"
          :class="[$style['tab'], sortType === 'new' && $style['active']]"
        >
          New Arrival
        </div>
        <div
          @click="sortType = 'rating'"
          :class="[$style['tab'], sortType === 'rating' && $style['active']]"
        >
          Best rated
        </div>
        <div
          @click="sortType = 'discount'"
          :class="[$style['tab'], sortType === 'discount' && $style['active']]"
        >
          Discounts
        </div>
      </div>
      <div :class="$style['products']">
        <ProductCard
          v-for="product in filtered.slice(0, 8)"
          :key="product.id"
          :product
        />
      </div>
    </div>
  </SecondaryLayout>
</template>

<style module>
.wrapper {
  padding: 3.5rem 0;
}
.tabs {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}
.tab {
  color: #8b8b8b;
  font-size: 1.125rem;
  font-family: var(--font-abeezee);
  font-style: italic;
  border-bottom: 2px solid transparent;
  padding-bottom: 0.2rem;
  cursor: pointer;
  user-select: none;
  transition:
    color 300ms,
    border-color 300ms,
    transform 300ms;
}
.tab.active {
  color: #000;
  border-color: #000;
}
.tab:not(.active):hover {
  transform: translateY(-0.3rem);
}
.products {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
</style>
