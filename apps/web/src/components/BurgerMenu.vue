<script setup>
defineProps({ isOpen: Boolean })
defineEmits(['close'])
</script>

<template>
  <div class="overlay" :class="{ active: isOpen }" @click="$emit('close')"></div>
  <aside class="sidebar" :class="{ active: isOpen }">
    <div class="sidebar-header">
      <span class="logo">CINEMA</span>
      <button class="close-btn" @click="$emit('close')">✕</button>
    </div>
    <nav class="nav-list">
      <router-link to="/" @click="$emit('close')">Главная</router-link>
      <router-link to="/movies" @click="$emit('close')">Афиша</router-link>
      <router-link to="/schedule" @click="$emit('close')">Расписание</router-link>
      <router-link to="/bookings" @click="$emit('close')">Мои брони</router-link>
      <router-link to="/contacts" @click="$emit('close')">Контакты</router-link>
    </nav>
  </aside>
</template>

<style scoped>
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); opacity: 0; pointer-events: none; transition: opacity 0.3s; z-index: 999; }
.overlay.active { opacity: 1; pointer-events: auto; }
.sidebar { position: fixed; top: 0; left: 0; bottom: 0; width: 280px; background: var(--surface-color); transform: translateX(-100%); transition: transform 0.3s ease; z-index: 1000; display: flex; flex-direction: column; }
.sidebar.active { transform: translateX(0); }
.sidebar-header { height: var(--header-height); display: flex; align-items: center; justify-content: space-between; padding: 0 20px; border-bottom: 1px solid rgba(255,255,255,0.1); }
.logo { font-size: 20px; font-weight: 800; color: var(--accent-color); }
.close-btn { color: var(--text-main); font-size: 20px; background: none; border: none; }
.nav-list { display: flex; flex-direction: column; padding: 20px 0; }
.nav-list a { padding: 15px 20px; font-size: 16px; color: var(--text-muted); transition: background 0.2s, color 0.2s; }
.nav-list a:hover, .nav-list a.router-link-active { background: rgba(255,255,255,0.05); color: var(--text-main); border-left: 3px solid var(--accent-color); }
</style>