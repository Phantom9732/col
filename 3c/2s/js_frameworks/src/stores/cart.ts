import type { Product } from '@/api/shop.types'
import { useProductsStore } from '@/stores/products'
import { defineStore } from 'pinia'
import { computed, ref, watch, type Ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart: Ref<Map<number, { qty: number; product: Product }>> = ref(
    new Map(JSON.parse(localStorage.getItem('cart_apple_shop') || '[]')),
  )

  const products = useProductsStore()

  watch(cart.value, state => {
    console.log('changed', state)
    localStorage.setItem(
      'cart_apple_shop',
      JSON.stringify([...state.entries()]),
    )
  })

  const isInCart = (prodId: number) => cart.value.has(prodId)

  const getCartItem = (prodId: number) => cart.value.get(prodId)

  const addToCart = (prodId: number) => {
    if (isInCart(prodId)) {
      const { product, qty } = getCartItem(prodId)!
      cart.value.set(prodId, { product, qty: qty + 1 })
    } else {
      const product = products.productById(prodId)
      if (product) cart.value.set(prodId, { product, qty: 1 })
    }
  }

  const deleteFromCart = (prodId: number) => {
    return cart.value.delete(prodId)
  }

  const incProduct = (prodId: number) => {
    if (isInCart(prodId)) {
      const { product, qty } = getCartItem(prodId)!
      cart.value.set(prodId, { product, qty: qty + 1 })
    }
  }

  const decProduct = (prodId: number) => {
    if (isInCart(prodId)) {
      const { product, qty } = getCartItem(prodId)!
      if (qty === 1) {
        deleteFromCart(prodId)
      } else cart.value.set(prodId, { product, qty: qty - 1 })
    }
  }

  const totalCount = computed(() => {
    return [...cart.value.values()].reduce((acc, { qty }) => acc + qty, 0)
  })

  const $reset = () => cart.value.clear()

  const totalPrice = computed(() => {
    return [...cart.value.values()].reduce(
      (acc, { qty, product }) =>
        acc + qty * (product.discount_price || product.price),
      0,
    )
  })

  return {
    cart,
    getCartItem,
    isInCart,
    addToCart,
    deleteFromCart,
    incProduct,
    decProduct,
    totalCount,
    totalPrice,
    $reset,
  }
})
