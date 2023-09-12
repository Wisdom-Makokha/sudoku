import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/HomeView.vue'
import about from '../views/AboutView.vue'
import rules from '../views/RulesView.vue'
import register from '../components/Forms/Register.vue'
import login from '../components/Forms/Login.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: home
    },
    {
      name: 'about',
      path: '/about',
      component: about
    },
    {
      name: 'rules',
      path: '/rules',
      component: rules
    },
    {
      name: 'register',
      path: '/register',
      component: register
    },
    {
      name: 'login',
      path: '/login',
      component: login
    }
  ]
})

export default router
