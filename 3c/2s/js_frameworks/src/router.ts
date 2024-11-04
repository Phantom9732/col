import CartView from '@/views/CartView.vue'
import FavoritesView from '@/views/FavoritesView.vue'
import HomeView from '@/views/HomeView.vue'
import ProductsView from '@/views/ProductsView.vue'
import ProductView from '@/views/ProductView.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', component: HomeView, name: 'Home' },
  { path: '/categories/:id', component: ProductsView, name: 'Products' },
  { path: '/detail/:id', component: ProductView, name: 'Product detail' },
  { path: '/cart', component: CartView, name: 'Cart' },
  { path: '/favorites', component: FavoritesView, name: 'Favorites' },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})
