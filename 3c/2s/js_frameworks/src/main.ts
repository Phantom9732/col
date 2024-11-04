import { createApp } from 'vue'
import '@/assets/css/main.css'
import App from './App.vue'
import { router } from '@/router'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification'
// Import one of the available themes
// import 'vue-toast-notification/dist/theme-default.css'
// import 'vue-toast-notification/dist/theme-bootstrap.css'
import 'vue-toast-notification/dist/theme-sugar.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastPlugin)
app.mount('#app')
