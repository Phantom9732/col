<script lang="ts" setup>
import CategoriesCards from '@/components/HomePageComponents/CategoriesCards.vue'
import PopularProducts from '@/components/HomePageComponents/PopularProducts.vue'
import NewArrival from '@/components/HomePageComponents/NewArrival.vue'
import { categories } from '@/mocks/categories'
import TopSales from '@/components/HomePageComponents/TopSales.vue'
import DiscountedProducts from '@/components/HomePageComponents/DiscountedProducts.vue'
import BigSale from '@/components/HomePageComponents/BigSale.vue'
</script>

<template>
  <PopularProducts />
  <CategoriesCards :categories="categories" />
  <NewArrival />
  <TopSales />
  <DiscountedProducts />
  <BigSale />
</template>
