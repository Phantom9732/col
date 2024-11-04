<script lang="ts" setup>
import device1 from '@/assets/images/sale_device1.png'
import device2 from '@/assets/images/sale_device2.png'
import device3 from '@/assets/images/sale_device3.png'
import device4 from '@/assets/images/sale_device4.png'
import device5 from '@/assets/images/sale_device5.png'
import Button from '@/components/ui/Button.vue'
</script>

<template>
  <div :class="$style['wrapper']">
    <img
      :src="device1"
      alt=""
      :class="[$style['device'], $style['device1']]"
    /><img
      :src="device2"
      alt=""
      :class="[$style['device'], $style['device2']]"
    /><img
      :src="device3"
      alt=""
      :class="[$style['device'], $style['device3']]"
    />
    <div :class="$style['content']">
      <h3 :class="$style['heading']">Big Summer <span>Sale</span></h3>
      <p :class="$style['desc']">
        Commodo fames vitae vitae leo mauris in. Eu consequat.
      </p>
      <Button transparent="white">Shop Now</Button>
    </div>
    <img
      :src="device4"
      alt=""
      :class="[$style['device'], $style['device4']]"
    /><img
      :src="device5"
      alt=""
      :class="[$style['device'], $style['device5']]"
    />
  </div>
</template>

<style module>
.wrapper {
  background: linear-gradient(100.23deg, #2e2e2e 42.36%, #000000 98.65%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8.8rem 0 5.625rem;
  position: relative;
  text-align: center;
}
.heading {
  font-family: var(--font-abel);
  font-size: 4.5rem;
  color: #fff;
  font-weight: 400;
}
.heading span {
  font-family: var(--font-abeezee);
  font-style: italic;
}
.desc {
  font-family: var(--font-abel);
  font-size: 1rem;
  color: #787878;
  margin-bottom: 2.5rem;
}
.device {
  position: absolute;
}
.device1 {
  top: 0;
  left: 14rem;
}
.device2 {
  top: 0.25rem;
  left: 2.5rem;
  z-index: 1;
}
.device3 {
  left: 0;
  bottom: 1rem;
}
.device4 {
  bottom: 4.625rem;
  right: 0;
}
.device5 {
  bottom: 0;
  right: 0;
}
</style>
