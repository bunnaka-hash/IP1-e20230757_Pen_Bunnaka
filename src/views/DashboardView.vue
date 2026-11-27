<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { membersApi } from '../api/members'
import { membershipsApi } from '../api/memberships'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const totalMembers = ref(0)
const activeMemberships = ref(0)

onMounted(async () => {
  try {
    const [members, memberships] = await Promise.all([
      membersApi.getAll(),
      membershipsApi.getAll()
    ])

    totalMembers.value = members.length
    activeMemberships.value =
      memberships.filter(m => m.status === 'ACTIVE').length
  } catch {
    // Dashboard remains usable if the mock API is unavailable.
  }
})
</script>

<template>
  <section>
    <h1>Dashboard</h1>
    <p class="muted">Welcome back, {{ auth.user?.fullName }}</p>

    <div class="cards">
      <div class="card">
        <p>Total Members</p>
        <h2>{{ totalMembers }}</h2>
      </div>

      <div class="card">
        <p>Active Memberships</p>
        <h2>{{ activeMemberships }}</h2>
      </div>
    </div>

    <div class="card">
      <h3>Quick actions</h3>
      <RouterLink class="button-link" to="/members">View Members</RouterLink>
      <RouterLink class="button-link" to="/members/new">Register Member</RouterLink>
    </div>
  </section>
</template>