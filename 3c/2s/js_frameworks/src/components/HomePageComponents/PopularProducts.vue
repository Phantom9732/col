<script lang="ts" setup>
import Button from '@/components/ui/Button.vue'
import iphone from '@/assets/images/Iphone.png'
import playstation from '@/assets/images/PlayStation.png'
import macbook from '@/assets/images/MacBook.png'
import airpods from '@/assets/images/AirPods.png'
import vision from '@/assets/images/AppleVision.png'
</script>

<template>
  <div :class="$style['wrapper']">
    <div :class="$style['product-wrapper']">
      <div :class="[$style['product-item'], $style['product-item1']]">
        <div :class="$style['info']">
          <h5 :class="$style['pre-heading']">Pro.Beyond.</h5>
          <h2 :class="$style['product-title']">IPhone 14 Pro</h2>
          <p :class="$style['product-desc']">
            Created to change everything for the better. For everyone
          </p>
          <a href="#categories" :class="$style['shop-now']">
            <Button transparent="white">Shop Now</Button>
          </a>
        </div>
        <img :src="iphone" alt="" />
      </div>
    </div>
    <div :class="[$style['product-item'], $style['product-item2']]">
      <div :class="$style['info']">
        <h2 :class="$style['product-title']">Playstation 5</h2>
        <p :class="$style['product-desc']">
          Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will
          redefine your PlayStation experience.
        </p>
      </div>
      <img :src="playstation" alt="" />
    </div>
    <div :class="[$style['product-item'], $style['product-item3']]">
      <div :class="$style['info']">
        <h2 :class="$style['product-title']">Macbook <span>Air</span></h2>
        <p :class="$style['product-desc']">
          The new 15-inch MacBook Air makes room for more of what you love with
          a spacious Liquid Retina display.
        </p>
        <a href="#categories" :class="$style['shop-now']">
          <Button transparent="black">Shop Now</Button>
        </a>
      </div>
      <img :src="macbook" alt="" />
    </div>
    <div :class="[$style['product-item'], $style['product-item4']]">
      <div :class="$style['info']">
        <h2 :class="$style['product-title']">Apple AirPods Max</h2>
        <p :class="$style['product-desc']">
          Computational audio. Listen, it's powerful
        </p>
      </div>
      <img :src="airpods" alt="" />
    </div>
    <div :class="[$style['product-item'], $style['product-item5']]">
      <div :class="$style['info']">
        <h2 :class="$style['product-title']">Apple Vision Pro</h2>
        <p :class="$style['product-desc']">
          An immersive way to experience entertainment
        </p>
      </div>
      <img :src="vision" alt="" />
    </div>
  </div>
</template>

<style module>
.wrapper {
  font-family: var(--font-abel);
  display: grid;
  grid-template-areas:
    'a a a a'
    'a a a a'
    'b b c c'
    'd f c c';
}
.pre-heading {
  font-size: 1.563rem;
  color: #909090;
  font-family: var(--font-abeezee);
  font-weight: 400;
}
.product-wrapper {
  background-color: #211c24;
  grid-area: a;
}
.product-item {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
}
.product-item1 .product-title {
  font-size: 6rem;
  color: #fff;
  font-style: normal;
}
.product-item2 .product-title {
  font-size: 3.063rem;
  color: #000000;
  margin-bottom: 0.5rem;
  font-family: var(--font-abeezee);
}
.product-item3 .product-title {
  font-size: 4rem;
  color: #000;
}
.product-item4 .product-title {
  font-size: 1.813rem;
  color: #000;
  margin-bottom: 1rem;
  font-family: var(--font-abeezee);
}
.product-item5 .product-title {
  font-size: 1.813rem;
  color: #fff;
  margin-bottom: 1rem;
  font-family: var(--font-abeezee);
}
.product-item3 .product-title {
  font-style: normal;
}
.product-item3 span {
  font-style: italic;
  font-family: var(--font-abeezee);
}
.product-title {
  font-style: italic;
  color: #000;
  font-weight: 400;
}
.product-desc {
  color: #909090;
  font-style: italic;
  line-height: 1.5rem;
}
.product-item1 {
  justify-content: space-between;
  max-width: 70rem;
  margin-inline: auto;
}
.product-item2 {
  grid-area: b;
  background-color: #fff;
  flex-direction: row-reverse;
  gap: 0;
}
.product-item3 {
  grid-area: c;
  background-color: #ededed;
  gap: 0;
}
.product-item4 {
  grid-area: d;
  background-color: #ededed;
  flex-direction: row-reverse;
  gap: 3rem;
}
.product-item5 {
  grid-area: f;
  background-color: #353535;
  flex-direction: row-reverse;
}
:is(.product-item4, .product-item5) .info {
  width: 40%;
}
.product-item3 .info {
  width: 52%;
}
.product-item2 .info {
  width: 45%;
}
.shop-now {
  display: block;
  margin-top: 1.25rem;
}
</style>
