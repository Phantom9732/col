<script lang="ts" setup>
defineProps<{
  current: string | number
  old: string | number
}>()
</script>

<template>
  <div :class="$style.prices">
    <div :class="$style['current-price']">{{ current }}</div>
    <div :class="$style['old-price']">{{ old }}</div>
  </div>
</template>

<style module>
.prices {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.current-price {
  font-family: var(--font-abeezee);
  font-size: 2rem;
  font-style: italic;
  color: black;
}
.old-price {
  font-family: var(--font-abel);
  font-size: 1.5rem;
  font-style: normal;
  color: #a0a0a0;
  text-decoration: line-through;
}
</style>
