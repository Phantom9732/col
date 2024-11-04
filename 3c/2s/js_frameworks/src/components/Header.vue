<script setup lang="ts">
import BaseLayout from '@/components/BaseLayout.vue'
import SecondaryLayout from '@/components/SecondaryLayout.vue'
import Search from '@/components/ui/Search.vue'

import logoImg from '@/assets/images/logo-black.svg'
import heartImg from '@/assets/images/heart.svg'
import cartImg from '@/assets/images/cart.svg'
import { useCartStore } from '@/stores/cart'
import { useFavoritesStore } from '@/stores/favorites'

const cart = useCartStore()
const favorites = useFavoritesStore()
</script>

<template>
  <BaseLayout>
    <SecondaryLayout>
      <div :class="$style.container">
        <div :class="$style.logo">
          <RouterLink to="/">
            <img :src="logoImg" alt="" />
          </RouterLink>
        </div>
        <div :class="$style.search">
          <Search />
        </div>
        <div :class="$style.buttons">
          <RouterLink to="/favorites">
            <img :src="heartImg" alt="" />
            <div v-if="favorites.totalFavorites" :class="$style.facounter">
              {{ favorites.totalFavorites }}
            </div>
          </RouterLink>
          <RouterLink to="/cart">
            <img :src="cartImg" alt="" />
            <div v-if="cart.totalCount" :class="$style.counter">
              {{ cart.totalCount }}
            </div>
          </RouterLink>
        </div>
      </div>
    </SecondaryLayout>
  </BaseLayout>
</template>

<style module>
.container {
  display: grid;
  grid-template-columns: 9.375rem 1fr 150px;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem 0;
  position: relative;
}
.logo img {
  height: 1.438rem;
}
.search {
  justify-self: center;
}
.buttons {
  justify-self: flex-end;
  display: flex;
  gap: 1.5rem;
}
.buttons img {
  width: 2rem;
  height: 2rem;
}
.counter,
.facounter {
  position: absolute;
  top: 42%;
  right: 0;
  translate: -20px -50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  background-color: red;
  color: #fff;
  text-decoration: none;
  font-size: 0.8rem;
  font-family: var(--font-abeezee);
}
.facounter {
  right: 55px;
}
</style>
