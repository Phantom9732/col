<script lang="ts" setup>
import icon from '@/assets/images/search.svg'

const { placeholder = 'Search' } = defineProps<{
  placeholder?: string
  modelValue?: string
  name?: string
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <div :class="$style.container">
    <input
      :class="$style.input"
      :placeholder
      :value="modelValue"
      :name
      type="text"
      autocomplete="current-password"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <img :src="icon" alt="" :class="$style.icon" />
  </div>
</template>

<style module>
.container {
  position: relative;
  align-self: center;
  min-width: 23.25rem;
}
.input {
  font-size: 0.875rem;
  font-family: var(--font-abeezee);
  background-color: #f5f5f5;
  border-radius: 0.5rem;
  border: none;
  padding: 1.188rem 1.188rem 1.188rem 3rem;
  outline: none;
  min-width: 0;
  width: 100%;
}
.icon {
  position: absolute;
  top: 50%;
  left: 1rem;
  translate: 0 -50%;
}
</style>
