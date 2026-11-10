import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/movies', name: 'movies', component: () => import('../views/MoviesView.vue') },
    { path: '/schedule', name: 'schedule', component: () => import('../views/ScheduleView.vue') },
    { path: '/bookings', name: 'bookings', component: () => import('../views/MyBookingsView.vue') },
    { path: '/contacts', name: 'contacts', component: () => import('../views/ContactsView.vue') },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    
    // Заглушка для админки
    { path: '/admin', name: 'admin', component: () => import('../views/AdminView.vue') }
  ]
})

export default router