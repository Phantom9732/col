<script lang="ts" setup>
import chevronImg from '@/assets/images/chevron.svg'
import { onMounted, onBeforeUnmount, ref, useTemplateRef, computed } from 'vue'

const props = defineProps<{
  placeholder?: string
  modelValue?: string
  data: { name: string; value: string }[]
}>()

defineEmits(['update:modelValue'])

const isOpen = ref(false)
const containerRef = useTemplateRef<HTMLDivElement>('containerRef')

const handleClickOutside = (event: MouseEvent) => {
  if (!containerRef.value?.contains(event.target as Node)) {
    isOpen.value = false
  }
}

const selectedItem = computed(() => {
  return props.data?.find(el => el.value === props.modelValue)
})

onMounted(() => {
  document.body.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() =>
  document.body.removeEventListener('click', handleClickOutside),
)
</script>

<template>
  <div
    :class="[$style.container, isOpen && $style.open]"
    @click.stop="isOpen = !isOpen"
    ref="containerRef"
  >
    <div :class="$style.top">
      {{ selectedItem?.name || placeholder || 'Select value' }}
      <img :class="$style.chevron" :src="chevronImg" alt="" />
    </div>
    <div v-if="isOpen" :class="$style.dropdown">
      <div
        v-for="item in data"
        :key="item.value"
        :class="[$style.item, item.value === modelValue && $style.selected]"
        @click="$emit('update:modelValue', item.value)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  position: relative;
  border: 0.063rem solid #d4d4d4;
  border-radius: 0.5rem;
  min-width: 16rem;
  cursor: pointer;
  user-select: none;
  z-index: 1;
  flex-shrink: 0;
}
.container.open .chevron {
  rotate: 180deg;
}
.top {
  padding: 0.75rem 1rem;
  font-family: var(--font-abel);
  font-size: 0.938rem;
  line-height: 1rem;
  color: black;
  position: relative;
}
.chevron {
  position: absolute;
  top: 50%;
  right: 1rem;
  translate: 0 -50%;
  transition: rotate 50ms;
}
.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  width: 100%;
  border: 0.063rem solid #d4d4d4;
  border-radius: 0.5rem;
  z-index: 4;
  padding: 0.25rem 0;
  background-color: #fff;
}
.item {
  font-family: var(--font-abel);
  font-size: 0.938rem;
  line-height: 1rem;
  color: black;
  position: relative;
  padding: 0.25rem 1rem;
  position: relative;
  transition: color 300ms;
}

.selected,
.item:hover {
  color: coral;
}
</style>
