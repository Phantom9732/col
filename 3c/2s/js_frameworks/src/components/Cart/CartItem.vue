<script lang="ts" setup>
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'

const props = defineProps<{
  product: {
    id: number
    name: string
    discount_price: null | number
    price: number
    images: string[]
  }
}>()

const cart = useCartStore()
const currentCartItem = computed(() => cart.getCartItem(props.product.id))
</script>

<template>
  <div v-if="currentCartItem" :class="$style['item']">
    <RouterLink :to="`/detail/${product.id}`" :class="$style['info']">
      <img :src="product.images?.[0]" alt="" :class="$style['image']" />
      <div>
        <div :class="$style['title']">
          {{ product.name }}
        </div>
        <div :class="$style['article']">#25139526913984</div>
      </div>
    </RouterLink>
    <div :class="$style['counter']">
      <button
        @click="cart.decProduct(product.id)"
        :class="$style['count-button']"
      >
        -</button
      ><input
        type="number"
        :value="currentCartItem.qty"
        :class="$style['input']"
        disabled
      /><button
        @click="cart.incProduct(product.id)"
        :class="$style['count-button']"
      >
        +
      </button>
    </div>
    <div :class="$style['price']">
      ${{ product.discount_price || product.price }}
    </div>
    <button @click="cart.deleteFromCart(product.id)" :class="$style['remove']">
      &times;
    </button>
  </div>
</template>

<style module>
.item {
  padding: 2.5rem 0;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item:last-child {
  border: none;
}
.image {
  max-height: 5.625rem;
  margin-right: 1rem;
}
.info {
  margin-right: 0.5rem;
  text-decoration: none;
  color: #000;
  display: flex;
  align-items: center;
}
.title {
  font-family: var(--font-abeezee);
  font-size: 1rem;
  font-style: italic;
  line-height: 1.5rem;
  margin-bottom: 0.5rem;
}
.article {
  font-family: var(--font-abel);
  font-size: 0.875rem;
  line-height: 1.5rem;
}
.input,
.count-button {
  font-family: var(--font-abeezee);
  font-size: 1rem;
  font-style: italic;
  text-align: center;
}
.input {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d9d9d9;
  max-width: 4rem;
  &::selection {
    background-color: transparent;
  }
}
.input:disabled {
  background-color: #fff;
}
.input::-webkit-outer-spin-button,
.input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  -moz-appearance: textfield;
  margin: 0;
}
.counter {
  display: flex;
}
.count-button {
  border: none;
  background: none;
  cursor: pointer;
  padding-inline: 1rem;
}
.price {
  font-family: var(--font-abeezee);
  font-size: 1.25rem;
  font-style: italic;
}
.remove {
  border: none;
  background: none;
  font-size: 2rem;
  padding-inline: 1rem;
  cursor: pointer;
}
</style>
