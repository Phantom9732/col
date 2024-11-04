<script lang="ts" setup>
defineProps<{
  full?: boolean
  medium?: boolean
  transparent?: 'white' | 'black'
}>()

defineEmits(['click'])
</script>

<template>
  <button
    @click="$emit('click', $event)"
    :class="[
      $style.button,
      full && $style.full,
      medium && $style.medium,
      transparent === 'white' && $style['trans-white'],
      transparent === 'black' && $style['trans-black'],
    ]"
  >
    <slot />
  </button>
</template>

<style module>
.button {
  font-family: var(--font-abeezee);
  font-size: 1rem;
  font-style: italic;
  background-color: black;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem;
  min-width: 11.625rem;
  cursor: pointer;
  margin-bottom: 20px;
}

.full {
  width: 100%;
}
.medium {
  font-size: 0.875rem;
}
.trans-white {
  border: 1px solid white;
  color: white;
  background: transparent;
}

.trans-black {
  border: 1px solid black;
  color: black;
  background: transparent;
}
</style>
