import { defineStore } from 'pinia'
import { ref } from 'vue'
import { membersApi, type Member } from '../api/members'

export const useMembersStore = defineStore('members', () => {
  const members = ref<Member[]>([])
  const loading = ref(false)
  const error = ref('')

  async function fetchMembers() {
    loading.value = true
    error.value = ''

    try {
      members.value = await membersApi.getAll()
    } catch {
      error.value = 'Unable to load members. Please try again.'
    } finally {
      loading.value = false
    }
  }

  async function createMember(member: Omit<Member, 'id'>) {
    const created = await membersApi.create(member)
    members.value.unshift(created)
    return created
  }

  return { members, loading, error, fetchMembers, createMember }
})