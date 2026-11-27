import { defineStore } from 'pinia'
import { ref } from 'vue'
import { usersApi } from '../api/users'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('gmms-user') || 'null'))

  async function login(email: string, password: string) {
    const users = await usersApi.getAll()

    const found = users.find(
      u => u.email === email &&
           u.password === password &&
           u.isActive
    )

    if (!found) {
      throw new Error('Invalid email or password')
    }

    user.value = {
      id: found.id,
      fullName: found.fullName,
      email: found.email,
      role: found.role
    }

    localStorage.setItem('gmms-user', JSON.stringify(user.value))
  }

  function logout() {
    user.value = null
    localStorage.removeItem('gmms-user')
  }

  return { user, login, logout }
})