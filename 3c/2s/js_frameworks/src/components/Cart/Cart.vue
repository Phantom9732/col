<script lang="ts" setup>
import CartItem from '@/components/Cart/CartItem.vue'
import OrderForm from '@/components/Cart/OrderForm.vue'
import SecondaryLayout from '@/components/SecondaryLayout.vue'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
</script>

<template>
  <SecondaryLayout>
    <div :class="$style['wrapper']">
      <div :class="$style['items']">
        <h2 :class="$style['heading']">Shopping Cart</h2>
        <CartItem
          v-for="[, { product }] in cart.cart"
          :key="product.id"
          :product
        />
      </div>
      <OrderForm />
    </div>
  </SecondaryLayout>
</template>

<style module>
.wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: flex-start;
  gap: 3rem;
  padding: 7rem 0;
}
.heading {
  font-family: var(--font-abel);
  font-size: 1.5rem;
  line-height: 1.5rem;
  font-weight: 400;
}
</style>
