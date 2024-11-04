<script lang="ts" setup>
import deliveryImg from '@/assets/images/car.svg'
import stockImg from '@/assets/images/stock.svg'
import guaranteeImg from '@/assets/images/guarantee.svg'

type IconType = 'delivery' | 'stock' | 'guarantee'

const icons: Record<IconType, string> = {
  delivery: deliveryImg,
  stock: stockImg,
  guarantee: guaranteeImg,
}

defineProps<{
  icon: IconType
  title: string
  value: string
}>()
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.block">
      <img :class="$style.icon" :src="icons[icon]" alt="" />
    </div>
    <div :class="$style.detail">
      <div :class="$style.title">{{ title }}</div>
      <div :class="$style.value">{{ value }}</div>
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  gap: 1rem;
}
.block {
  width: 3.5rem;
  height: 3.5rem;
  background-color: #f6f6f6;
  border-radius: 0.688rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon {
  width: 1.5rem;
  height: 1.5rem;
}
.detail {
  font-family: var(--font-abeezee);
  font-size: 0.875rem;
  line-height: 1.5rem;
  font-style: italic;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.title {
  color: #717171;
}
.value {
  color: #000000;
}
</style>
