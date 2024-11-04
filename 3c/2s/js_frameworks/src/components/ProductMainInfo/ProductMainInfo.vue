<script setup lang="ts">
import SecondaryLayout from '@/components/SecondaryLayout.vue'
import InformationBlock from './InformationBlock.vue'
import { useProductsStore } from '@/stores/products'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const products = useProductsStore()
const currentProduct = computed(() =>
  products.productById(Number(route.params.id)),
)
</script>

<template>
  <SecondaryLayout>
    <div v-if="currentProduct" :class="$style.container">
      <div :class="$style['preview-list']">
        <img v-for="src in currentProduct.images" :key="src" :src alt="" />
      </div>
      <img :src="currentProduct.images?.[0]" :class="$style.preview" />
      <InformationBlock :currentProduct />
    </div>
  </SecondaryLayout>
</template>

<style module>
.container {
  padding: 6.875rem 0;
  display: grid;
  grid-template-columns: 4.688rem 25.938rem 1fr;
  align-items: center;
  gap: 3rem;
}
.preview-list {
  display: grid;
  gap: 1.5rem;
  & img {
    width: 100%;
    cursor: pointer;
  }
}
.preview {
  width: 100%;
}
</style>
