<script setup lang="ts">
import BaseLayout from '@/components/BaseLayout.vue'
import SecondaryLayout from '@/components/SecondaryLayout.vue'

import logoWhiteImg from '@/assets/images/logo-white.svg'
import twitterImg from '@/assets/images/twitter.svg'
import fbImg from '@/assets/images/fb.svg'
import ttImg from '@/assets/images/tiktok.svg'
import instImg from '@/assets/images/inst.svg'
</script>

<template>
  <BaseLayout>
    <div :class="$style.container">
      <SecondaryLayout>
        <div :class="$style.content">
          <div>
            <RouterLink to="/">
              <img :class="$style.logo" :src="logoWhiteImg" alt="" />
            </RouterLink>
            <p :class="$style['logo-text']">
              We are a residential interior design firm located in Portland. Our
              boutique-studio offers more than
            </p>
          </div>
          <div :class="$style.col">
            <h4 :class="$style.title">Services</h4>
            <p :class="$style.link">Bonus program</p>
            <p :class="$style.link">Gift cards</p>
            <p :class="$style.link">Credit and payment</p>
            <p :class="$style.link">Service contracts</p>
            <p :class="$style.link">Non-cash account</p>
            <p :class="$style.link">Payment</p>
          </div>
          <div :class="$style.col">
            <h4 :class="$style.title">Assistance to the buyer</h4>
            <p :class="$style.link">Find an order</p>
            <p :class="$style.link">Terms of delivery</p>
            <p :class="$style.link">Exchange and return of goods</p>
            <p :class="$style.link">Guarantee</p>
            <p :class="$style.link">Frequently asked questions</p>
            <p :class="$style.link">Terms of use of the site</p>
          </div>
          <div :class="$style.socials">
            <a href="https://twitter.com/">
              <img :src="twitterImg" alt="twitter" />
            </a>
            <a href="https://facebook.com/">
              <img :src="fbImg" alt="facebook" />
            </a>
            <a href="https://tiktok.com/">
              <img :src="ttImg" alt="tiktok" />
            </a>
            <a href="https://www.instagram.com/">
              <img :src="instImg" alt="instagram" />
            </a>
          </div>
        </div>
      </SecondaryLayout>
    </div>
  </BaseLayout>
</template>

<style module>
.container {
  background-color: black;
  color: white;
  padding: 6.5rem 0;
}
.content {
  display: grid;
  grid-template-columns: 1fr 18.438rem 18.438rem;
  gap: 2rem;
}
.logo {
  margin-bottom: 1.5rem;
}
.logo-text {
  font-family: var(--font-abeezee);
  font-size: 0.875remx;
  line-height: 170%;
  font-style: italic;
  color: #cfcfcf;
  max-width: 23.75rem;
}
.title {
  font-family: var(--font-abel);
  font-size: 1rem;
  line-height: 1rem;
  color: white;
}

.link {
  font-family: var(--font-abel);
  font-size: 0.875rem;
  color: #cfcfcf;
  line-height: 2rem;
  cursor: pointer;
}
.col {
  display: grid;
  gap: 0.5rem;
}
.socials {
  display: flex;
  gap: 2.25rem;
}
</style>
