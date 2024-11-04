<script setup lang="ts">
import BaseLayout from '@/components/BaseLayout.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { ShopApi } from '@/api'
import { useProductsStore } from '@/stores/products'
import { onMounted } from 'vue'

const productsStore = useProductsStore()

onMounted(async () => {
  const data = await ShopApi.getProducts()
  productsStore.products = data
  productsStore.isLoading = false
})
</script>

<template>
  <Header />
  <BaseLayout>
    <RouterView />
  </BaseLayout>
  <Footer />
</template>
