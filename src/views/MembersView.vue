<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useMembersStore } from '../stores/members'

const store = useMembersStore()
const search = ref('')

const filtered = computed(() =>
  store.members.filter(m =>
    `${m.fullName} ${m.memberCode} ${m.email}`
      .toLowerCase()
      .includes(search.value.toLowerCase())
  )
)

onMounted(store.fetchMembers)
</script>

<template>
  <section>
    <div class="page-header">
      <div>
        <h1>Members</h1>
        <p class="muted">Manage gym member records</p>
      </div>
      <RouterLink class="button-link" to="/members/new">
        + Register Member
      </RouterLink>
    </div>

    <input v-model="search" placeholder="Search name, code or email..." />

    <div v-if="store.loading" class="card">Loading members...</div>

    <div v-else-if="store.error" class="card">
      <p class="error">{{ store.error }}</p>
      <button @click="store.fetchMembers">Retry</button>
    </div>

    <div v-else-if="filtered.length === 0" class="card">
      No members found.
    </div>

    <div v-else class="card table-wrap">
      <table>
        <thead>
          <tr>
            <th>Member ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in filtered" :key="member.id">
            <td>{{ member.memberCode }}</td>
            <td>{{ member.fullName }}</td>
            <td>{{ member.email }}</td>
            <td>{{ member.phone }}</td>
            <td>
              <RouterLink :to="`/members/${member.id}`">View</RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>