import { createRouter, createWebHistory } from 'vue-router'
import CountrySelector from '../components/CountrySelector.vue'

const routes = [
  {
    path: '/',
    name: 'CountrySelector',
    component: CountrySelector
  },
  // ... other routes
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 