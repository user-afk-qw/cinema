<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isLoginMode = ref(true) // true = вход, false = регистрация
const login = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

const handleSubmit = async () => {
  error.value = ''
  isLoading.value = true
  try {
    if (isLoginMode.value) {
      await authStore.login(login.value, password.value)
    } else {
      await authStore.register(login.value, password.value)
    }
    router.push('/') // при успехе - на главную
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>{{ isLoginMode ? 'Вход в систему' : 'Регистрация' }}</h2>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Логин</label>
          <input v-model="login" type="text" placeholder="Придумайте логин" required />
        </div>
        <div class="form-group">
          <label>Пароль</label>
          <input v-model="password" type="password" placeholder="Придумайте пароль" required />
        </div>
        
        <div v-if="error" class="error">{{ error }}</div>
        
        <button type="submit" :disabled="isLoading" class="submit-btn">
          {{ isLoading ? 'Загрузка...' : (isLoginMode ? 'Войти' : 'Зарегистрироваться') }}
        </button>
      </form>

      <p class="toggle-mode" @click="isLoginMode = !isLoginMode">
        {{ isLoginMode ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти' }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth-container { display: flex; justify-content: center; align-items: center; min-height: 60vh; }
.auth-card { background: var(--surface-color); padding: 30px; border-radius: 12px; width: 100%; max-width: 400px; }
h2 { margin-bottom: 20px; text-align: center; }
.form-group { margin-bottom: 15px; }
label { display: block; margin-bottom: 5px; color: var(--text-muted); font-size: 14px; }
input { width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #333; background: #121212; color: white; outline: none; }
input:focus { border-color: var(--accent-color); }
.error { color: #ff4d4d; font-size: 14px; margin-bottom: 15px; text-align: center; }
.submit-btn { width: 100%; padding: 12px; background: var(--accent-color); color: white; font-weight: bold; border-radius: 6px; font-size: 16px; transition: opacity 0.2s; }
.submit-btn:hover { opacity: 0.9; }
.submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.toggle-mode { margin-top: 15px; font-size: 14px; color: var(--accent-color); text-align: center; cursor: pointer; }
.toggle-mode:hover { text-decoration: underline; }
</style>