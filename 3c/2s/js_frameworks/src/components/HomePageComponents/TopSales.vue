<script lang="ts" setup>
import Button from '@/components/ui/Button.vue'
import popupal from '@/assets/images/watch_airpods.png'
import tablet from '@/assets/images/Ipad.png'
import smartphone from '@/assets/images/Samsung.png'
import notebook from '@/assets/images/Macbook2.png'
</script>

<template>
  <div :class="$style['wrapper']">
    <div :class="[$style['card'], $style['card1']]">
      <img :src="popupal" alt="" :class="$style['image']" />
      <div :class="$style['content']">
        <h3 :class="$style['title']">Popular Products</h3>
        <div :class="$style['desc']">
          iPad combines a magnificent 10.2-inch Retina display, incredible
          performance, multitasking and ease of use.
        </div>
        <Button transparent="black">Shop now</Button>
      </div>
    </div>
    <div :class="[$style['card'], $style['card2']]">
      <img :src="tablet" alt="" :class="$style['image']" />
      <div :class="$style['content']">
        <h3 :class="$style['title']">Ipad Pro</h3>
        <div :class="$style['desc']">
          iPad combines a magnificent 10.2-inch Retina display, incredible
          performance, multitasking and ease of use.
        </div>
        <Button transparent="black">Shop now</Button>
      </div>
    </div>
    <div :class="[$style['card'], $style['card3']]">
      <img :src="smartphone" alt="" :class="$style['image']" />
      <div :class="$style['content']">
        <h3 :class="$style['title']">Samsung Galaxy</h3>
        <div :class="$style['desc']">
          iPad combines a magnificent 10.2-inch Retina display, incredible
          performance, multitasking and ease of use.
        </div>
        <Button transparent="black">Shop now</Button>
      </div>
    </div>
    <div :class="[$style['card'], $style['card4']]">
      <img :src="notebook" alt="" :class="$style['image']" />
      <div :class="$style['content']">
        <h3 :class="$style['title']">Macbook Pro</h3>
        <div :class="$style['desc']">
          iPad combines a magnificent 10.2-inch Retina display, incredible
          performance, multitasking and ease of use.
        </div>
        <Button transparent="white">Shop now</Button>
      </div>
    </div>
  </div>
</template>

<style module>
.wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.image {
  max-height: 22.5rem;
  object-fit: cover;
  width: 100%;
}
.content {
  padding: 0.625rem 2rem 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}
.card1 {
  background-color: #fff;
}
.card2 {
  background-color: #f9f9f9;
}
.card3 {
  background-color: #eaeaea;
}
.card4 {
  background-color: #2c2c2c;
}
.title {
  font-family: var(--font-abeezee);
  font-size: 2.063rem;
  font-style: italic;
  font-weight: 400;
}
.card4 .title {
  color: #fff;
}
.desc {
  font-family: var(--font-abeezee);
  font-size: 0.875rem;
  line-height: 1.5rem;
  font-style: italic;
  color: #909090;
}
</style>
