<script setup lang="ts">
import SearchInput from '@/components/ui/SearchInput.vue'
import { useProductsStore } from '@/stores/products'
import { ref, computed, useTemplateRef, onMounted, onUnmounted } from 'vue'

const products = useProductsStore()
const searchValue = ref('')
const containerRef = useTemplateRef<HTMLDivElement>('containerRef')

const searchResult = computed(() =>
  products.getProductsByName(searchValue.value),
)
const handleClickOutside = (event: MouseEvent) => {
  if (!containerRef.value?.contains(event.target as Node)) {
    searchValue.value = ''
  }
}
onMounted(() => document.body.addEventListener('click', handleClickOutside))
onUnmounted(() =>
  document.body.removeEventListener('click', handleClickOutside),
)
</script>

<template>
  <div ref="containerRef" :class="$style.container">
    <SearchInput v-model="searchValue" />
    <div @click="searchValue = ''" :class="$style.dropdown">
      <RouterLink
        v-for="item in searchResult"
        :key="item.id"
        :class="$style.item"
        :to="`/detail/${item.id}`"
      >
        <img :class="$style.image" :src="item.images?.[0]" alt="" />
        <div :class="$style.title">
          {{ item.name }} (${{ item.discount_price || item.price }})
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style module>
.container {
  position: relative;
}
.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #fff;
  max-height: 200px;
  overflow: auto;
  border: 1px solid #ebebeb;
  border-radius: 0.5rem;
}
.item {
  display: grid;
  grid-template-columns: 30px 1fr;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-family: var(--font-abeezee);
  font-size: 14px;
  &:link,
  &:visited {
    text-decoration: none;
    color: black;
  }
}
.image {
  min-width: 0;
  width: 100%;
}
</style>
