<script lang="ts" setup>
import Mask from '@/components/ui/StarsMask.vue'
import emptyStars from '@/assets/images/empty-stars.svg'

defineProps<{
  rating: number
  reviews: number | string
}>()
</script>

<template>
  <Mask />
  <div :class="$style.container">
    <div :class="$style.rating">{{ rating }}</div>
    <div :class="$style.description">
      <div :class="$style.reviews">of {{ reviews }} reviews</div>
      <div :class="$style.starsBlock">
        <img :class="$style.empty" :src="emptyStars" alt="" />
        <div :class="$style.stars">
          <div
            :style="{ width: `${(rating || 0) * 18.7}%` }"
            :class="$style.line"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  background-color: #fafafa;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  width: max-content;
  padding: 5px 8px;
  border-radius: 12px;
}
.stars {
  width: 110px;
  height: 23px;
  mask-image: url('#stars-mask');
  position: relative;
}
.rating {
  font-family: var(--font-abeezee);
  font-size: 50px;
  font-style: italic;
  color: black;
}
.description {
}
.reviews {
  font-family: var(--font-abeezee);
  font-size: 15px;
  font-style: italic;
  color: black;
  opacity: 0.3;
  margin-bottom: 4px;
}
.line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 0%;
  background-color: #ffb547;
}
.starsBlock {
  position: relative;
}
.empty {
  z-index: 10;
  position: absolute;
  top: -1px;
  bottom: 0;
  left: -3px;
  width: 100%;
  transform: scale(0.95);
}
</style>
