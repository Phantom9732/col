<script lang="ts" setup>
import type { Category } from '@/mocks/categories'

defineProps<{ category: Category }>()
</script>

<template>
  <RouterLink :to="`/categories/${category.id}`" :class="$style['card']">
    <img :src="category.image" alt="" :class="$style['image']" />
    <h3 :class="$style['title']">{{ category.name }}</h3>
  </RouterLink>
</template>

<style module>
.card {
  background-color: #ededed;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.938rem;
  padding: 1.5rem;
  text-decoration: none;
  transition: transform 300ms;
}
.card:hover {
  transform: translateY(-0.2rem);
}
.image {
  height: 3rem;
  width: 3rem;
  margin-bottom: 1rem;
}
.title {
  font-size: 1rem;
  font-family: var(--font-abeezee);
  color: #000;
  font-style: italic;
}
</style>
