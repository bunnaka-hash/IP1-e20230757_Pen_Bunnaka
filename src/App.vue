<script setup lang="ts">
import { useAuthStore } from './stores/auth'

const auth = useAuthStore()
</script>

<template>
  <div class="app">
    <aside v-if="auth.user" class="sidebar">
      <h2>GMMS</h2>
      <p class="muted">Gym Management</p>

      <nav>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <RouterLink to="/members">Members</RouterLink>
        <RouterLink v-if="auth.user.role === 'ADMIN'" to="/plans">
          Membership Plans
        </RouterLink>
      </nav>

      <div class="sidebar-bottom">
        <p>{{ auth.user.fullName }}</p>
        <small>{{ auth.user.role }}</small>
        <button class="secondary" @click="auth.logout(); $router.push('/login')">
          Logout
        </button>
      </div>
    </aside>

    <main class="main">
      <RouterView />
    </main>
  </div>
</template>