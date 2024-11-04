<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import { useCartStore } from '@/stores/cart'
import { useToast } from 'vue-toast-notification'

const cart = useCartStore()
const toast = useToast()
const handleSubmit = () => {
  toast.success('Order success')
  cart.$reset()
}
</script>

<template>
  <form @submit.prevent="handleSubmit" :class="$style['form']">
    <div :class="$style['heading']">Order Summary</div>
    <label :class="$style['label']"
      ><span>Discount code / Promo code</span
      ><input :class="$style['input']" placeholder="Code" type="text" /></label
    ><label :class="$style['label']"
      ><span>Your bonus card number</span
      ><input
        :class="$style['input']"
        placeholder="Enter Card Number"
        type="text"
        required
    /></label>
    <div :class="$style['info']">
      <div :class="$style['info-item']">
        <span :class="$style['property']">Subtotal</span
        ><span :class="$style['sum']">${{ cart.totalPrice }}</span>
      </div>
      <div :class="$style['info-item']">
        <span :class="$style['property']">Estimated Tax</span
        ><span :class="$style['sum']">$50</span>
      </div>
      <div :class="$style['info-item']">
        <span :class="$style['property']">Estimated shipping & Handling</span
        ><span :class="$style['sum']">$29</span>
      </div>
      <div :class="$style['info-item']">
        <span :class="$style['property']">Total</span
        ><span :class="$style['sum']">${{ cart.totalPrice + 79 }}</span>
      </div>
    </div>
    <Button full>Checkout</Button>
  </form>
</template>

<style module>
.form {
  padding: 3.5rem 4rem;
  border: 1px solid #ebebeb;
  border-radius: 0.625rem;
  font-family: var(--font-abeezee);
  font-weight: 400;
  font-style: italic;
}
.heading {
  font-size: 1.25rem;
  line-height: 1rem;
  margin-bottom: 2.5rem;
}
.label {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}
.label span {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1rem;
}
.input {
  font-size: 0.875rem;
  line-height: 1.5rem;
  border: 1px solid #9f9f9f;
  border-radius: 0.438rem;
  padding: 1rem;
}
.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
.info-item:first-child {
  margin-bottom: 1rem;
}
.info-item:last-child {
  margin-top: 1rem;
  margin-bottom: 3.25rem;
}
.info-item:not(:first-child, :last-child) .property {
  color: #545454;
}
</style>
