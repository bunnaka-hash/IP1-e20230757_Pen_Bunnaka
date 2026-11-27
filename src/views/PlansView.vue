<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { plansApi, type Plan } from '../api/plans'

const plans = ref<Plan[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    plans.value = await plansApi.getAll()
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section>
    <h1>Membership Plans</h1>
    <p class="muted">Available gym membership plans</p>

    <div v-if="loading" class="card">Loading plans...</div>

    <div v-else class="cards">
      <div v-for="plan in plans" :key="plan.id" class="card">
        <h3>{{ plan.name }}</h3>
        <h2>${{ plan.price }}</h2>
        <p>{{ plan.durationDays }} days</p>
        <p>{{ plan.description }}</p>
      </div>
    </div>
  </section>
</template>