<script lang="ts" setup>
defineProps<{
  name: string
  value: string
}>()
</script>

<template>
  <div :class="$style.char">
    <h3 :class="$style['char-title']">{{ name }}</h3>
    <h3 :class="$style['char-value']">{{ value }}</h3>
  </div>
</template>

<style module>
.char {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  background-color: #f4f4f4;
  border-radius: 0.438rem;
  padding: 1rem;
}
.char-title {
  font-family: var(--font-abel);
  font-size: 0.875rem;
  font-weight: 400;
  color: #a7a7a7;
  line-height: 1rem;
}
.char-value {
  font-family: var(--font-abeezee);
  font-size: 0.875rem;
  font-style: italic;
  color: #4e4e4e;
  line-height: 1rem;
}
</style>
