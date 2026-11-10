<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import BurgerMenu from './BurgerMenu.vue'

const authStore = useAuthStore()
const router = useRouter()
const isMenuOpen = ref(false)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="header">
    <div class="header-left">
      <button class="icon-btn" @click="isMenuOpen = true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      <router-link to="/" class="logo">CINEMA</router-link>
    </div>

    <div class="header-right">
      <!-- Если пользователь авторизован -->
      <template v-if="authStore.user">
        <span class="user-name">{{ authStore.user.login }}</span>
        <button @click="handleLogout" class="logout-btn">Выйти</button>
      </template>
      
      <!-- Если НЕ авторизован -->
      <router-link v-else to="/login" class="icon-btn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </router-link>

      <!-- Кнопка Админ (показываем только если роль admin) -->
      <router-link v-if="authStore.user?.role === 'admin'" to="/admin" class="admin-btn">
        Админ
      </router-link>
    </div>
  </header>

  <BurgerMenu :is-open="isMenuOpen" @close="isMenuOpen = false" />
</template>

<style scoped>
.header {
  height: var(--header-height);
  background-color: var(--surface-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0,0,0,0.5);
}
.header-left, .header-right { display: flex; align-items: center; gap: 15px; }
.icon-btn { color: var(--text-main); display: flex; padding: 8px; border-radius: 50%; transition: background 0.2s; background: none; border: none; cursor: pointer; text-decoration: none; }
.icon-btn:hover { background: rgba(255,255,255,0.1); }
.logo { font-size: 20px; font-weight: 800; letter-spacing: 2px; color: var(--accent-color); text-decoration: none; }
.admin-btn { color: var(--text-muted); border: 1px solid var(--text-muted); padding: 6px 12px; border-radius: 4px; font-size: 14px; transition: all 0.2s; text-decoration: none; }
.admin-btn:hover { color: var(--text-main); border-color: var(--text-main); }
.user-name { font-weight: bold; color: var(--text-main); font-size: 14px; }
.logout-btn { background: none; border: none; color: var(--text-muted); font-size: 14px; cursor: pointer; transition: color 0.2s; }
.logout-btn:hover { color: var(--accent-color); }
</style>