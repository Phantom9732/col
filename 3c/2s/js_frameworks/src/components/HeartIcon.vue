<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  active?: boolean
  class?: string
}>()

const activeColor = '#FF0000'
const baseColor = '#919191'

const colors = computed(() => {
  if (props.active) return { stroke: activeColor, fill: activeColor }
  return { stroke: baseColor, fill: 'transparent' }
})
</script>

<template>
  <svg
    :class="props.class"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="none"
  >
    <path
      :stroke="colors.stroke"
      :fill="colors.fill"
      stroke-opacity=".77"
      stroke-width="1.4"
      d="m5.934 18.544 9.381 8.813c.325.305.487.457.685.457.198 0 .36-.152.685-.457l9.38-8.813a6.938 6.938 0 0 0 .732-9.31l-.413-.531c-2.624-3.382-7.891-2.815-9.735 1.048a.719.719 0 0 1-1.298 0c-1.844-3.863-7.111-4.43-9.736-1.048l-.412.532a6.938 6.938 0 0 0 .731 9.31Z"
    />
  </svg>
</template>
