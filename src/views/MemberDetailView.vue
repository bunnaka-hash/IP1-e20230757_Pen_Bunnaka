<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { membersApi, type Member } from '../api/members'

const route = useRoute()
const member = ref<Member | null>(null)
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    member.value = await membersApi.getById(route.params.id as string)
  } catch {
    error.value = 'Member not found.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section>
    <RouterLink to="/members">← Back to Members</RouterLink>
    <h1>Member Details</h1>

    <div v-if="loading" class="card">Loading...</div>
    <div v-else-if="error" class="card error">{{ error }}</div>

    <div v-else-if="member" class="card details">
      <h2>{{ member.fullName }}</h2>
      <p><strong>Member ID:</strong> {{ member.memberCode }}</p>
      <p><strong>Email:</strong> {{ member.email }}</p>
      <p><strong>Phone:</strong> {{ member.phone }}</p>
      <p><strong>Gender:</strong> {{ member.gender }}</p>
      <p><strong>Date of Birth:</strong> {{ member.dateOfBirth }}</p>
      <p><strong>Address:</strong> {{ member.address }}</p>
      <p><strong>Registered:</strong> {{ member.registeredAt }}</p>
    </div>
  </section>
</template>