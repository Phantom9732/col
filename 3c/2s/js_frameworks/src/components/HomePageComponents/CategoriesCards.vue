<script lang="ts" setup>
defineProps<{ categories: Category[] }>()
import SecondaryLayout from '@/components/SecondaryLayout.vue'
import CategoryCard from '@/components/HomePageComponents/CategoryCard.vue'
import type { Category } from '@/mocks/categories'
</script>

<template>
  <div id="categories" :class="$style['wrapper']">
    <SecondaryLayout>
      <div :class="$style['heading']">Browse By Category</div>
      <ul :class="$style['categories']">
        <li
          v-for="category in categories"
          :key="category.id"
          :class="$style['category']"
        >
          <CategoryCard :category="category" />
        </li>
      </ul>
    </SecondaryLayout>
  </div>
</template>

<style module>
.wrapper {
  background-color: #fafafa;
  padding: 3.75rem 0 5rem;
}
.heading {
  font-family: var(--font-abeezee);
  font-size: 1.5rem;
  line-height: 2rem;
  margin-bottom: 2rem;
}
.categories {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-content: space-between;
  gap: 2rem;
  list-style: none;
}
</style>
