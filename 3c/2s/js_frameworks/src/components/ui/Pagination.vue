<script lang="ts" setup>
defineProps<{
  totalPages: number
  currentPage: number
}>()
defineEmits(['select-page'])
</script>

<template>
  <div :class="$style.container">
    <button
      v-for="num in totalPages"
      @click="$emit('select-page', num)"
      :key="num"
      :class="[$style.button, num === currentPage && $style.active]"
    >
      {{ num }}
    </button>
  </div>
</template>

<style module>
.container {
  display: flex;
  gap: 0.5rem;
}
.button {
  font-family: var(--font-abeezee);
  font-size: 1rem;
  line-height: 1.5rem;
  font-style: italic;
  color: black;
  width: 2rem;
  height: 2rem;
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.313rem;
  border: none;
  cursor: pointer;
}
.button.active {
  color: white;
  background-color: black;
}
</style>
