<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue'
import SecondaryLayout from '@/components/SecondaryLayout.vue'
import Sort, { type SortType } from '@/components/ui/Sort.vue'
import CategoryCard from '@/components/HomePageComponents/CategoryCard.vue'
import { categories } from '@/mocks/categories'
import Pagination from '@/components/ui/Pagination.vue'
import { useProductsStore } from '@/stores/products'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { countPagination } from '@/utils/countPagination'

const products = useProductsStore()
const route = useRoute()
const sortType = ref<SortType>('default')

const currentProducts = computed(() => {
  return products.productsByCategory(Number(route.params.id))
})
const sortedProducts = computed(() => {
  if (sortType.value === 'default') return currentProducts.value
  if (sortType.value === 'new') {
    return [...currentProducts.value].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  }
  if (sortType.value === 'rating') {
    return [...currentProducts.value].sort((a, b) => b.rating - a.rating)
  }
  if (sortType.value === 'price') {
    return [...currentProducts.value].sort(
      (a, b) => (a.discount_price || a.price) - (b.discount_price || b.price),
    )
  }
  return []
})
const currentCategory = computed(() =>
  categories.find(cat => cat.id === Number(route.params.id)),
)

const paginatedProducts = computed(() =>
  sortedProducts.value.slice(
    ...countPagination(Number(route.query.page) || 1, 9),
  ),
)
</script>

<template>
  <SecondaryLayout>
    <div :class="$style.container">
      <div :class="$style.categories">
        <CategoryCard
          v-for="category in categories"
          :key="category.id"
          :category
        />
      </div>
      <div>
        <div :class="$style.top">
          <div :class="$style['total-products']">
            <div :class="$style['total-heading']">Total Products:</div>
            <div :class="$style['total-value']">
              {{ currentProducts.length }}
            </div>
            in {{ currentCategory?.name }}
          </div>
          <Sort @filter-select="t => (sortType = t)" />
        </div>
        <div :class="$style.list">
          <ProductCard
            v-for="product in paginatedProducts"
            :key="product.id"
            :product
          />
        </div>
      </div>
    </div>
    <div :class="$style.pagination">
      <Pagination
        @select-page="page => $router.push({ query: { page } })"
        :total-pages="Math.ceil(currentProducts.length / 9)"
        :current-page="Number($route.query.page || '1')"
      />
    </div>
  </SecondaryLayout>
</template>

<style module>
.container {
  display: grid;
  grid-template-columns: 10rem 1fr;
  gap: 1.5rem;
  padding-top: 1.5rem;
}
.categories {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 66px;
}
.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
.total-products {
  display: flex;
  gap: 6px;
  align-items: center;
  font-family: var(--font-abeezee);
  font-style: italic;
}
.total-heading {
  font-size: 1rem;
  color: #6c6c6c;
}
.total-value {
  color: #000000;
  font-size: 1.25rem;
}
.list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}
.pagination {
  width: max-content;
  margin-inline: auto;
  margin-bottom: 3.5rem;
}
</style>
