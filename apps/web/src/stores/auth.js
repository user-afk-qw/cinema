import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  // Берем данные из localStorage, чтобы при обновлении страницы не разлогинивало
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const token = ref(localStorage.getItem('token') || null)

  // Сохраняем данные после успешного входа
  const setAuthData = (data) => {
    user.value = data.user
    token.value = data.token
    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('token', data.token)
  }

  // Запрос на вход
  const login = async (loginStr, password) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        login: loginStr,
        password: password
      })
      setAuthData(response.data)
      return true
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message || 'Неверный логин или пароль')
      }
      throw new Error('Сервер недоступен')
    }
  }

  // Запрос на регистрацию
  const register = async (loginStr, password) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        login: loginStr,
        password: password
      })
      setAuthData(response.data)
      return true
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message || 'Ошибка регистрации')
      }
      throw new Error('Сервер недоступен')
    }
  }

  // Выход
  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return { user, token, login, register, logout }
})