<script lang="ts" setup>
import Select from '@/components/ui/Select.vue'
import { ref, watch } from 'vue'

export type SortType = 'default' | 'new' | 'rating' | 'price'

const data = [
  { name: 'by default', value: 'default' },
  { name: 'newest', value: 'new' },
  { name: 'by rating', value: 'rating' },
  { name: 'price: low-high', value: 'price' },
]
const emit = defineEmits(['filter-select'])

const selectedValue = ref('default')
watch(selectedValue, val => emit('filter-select', val), { immediate: true })
</script>

<template>
  <Select :data v-model="selectedValue" />
</template>
