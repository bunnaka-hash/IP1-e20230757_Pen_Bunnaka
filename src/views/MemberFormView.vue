<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMembersStore } from '../stores/members'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const store = useMembersStore()
const auth = useAuthStore()

const errors = ref<Record<string, string>>({})
const saving = ref(false)

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  gender: '',
  dateOfBirth: '',
  address: ''
})

function validate() {
  errors.value = {}

  if (form.fullName.trim().length < 2) {
    errors.value.fullName = 'Name must be at least 2 characters.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.value.email = 'Enter a valid email address.'
  }

  if (!/^[0-9+\-\s]{8,15}$/.test(form.phone)) {
    errors.value.phone = 'Enter a valid phone number.'
  }

  if (!form.gender) errors.value.gender = 'Please select gender.'
  if (!form.dateOfBirth) errors.value.dateOfBirth = 'Date of birth is required.'
  if (!form.address.trim()) errors.value.address = 'Address is required.'

  return Object.keys(errors.value).length === 0
}

async function submit() {
  if (!validate()) return

  saving.value = true

  try {
    const member = await store.createMember({
      ...form,
      memberCode: `GM${String(Date.now()).slice(-5)}`,
      registeredAt: new Date().toISOString().slice(0, 10),
      registeredBy: auth.user?.id ?? 1
    })

    router.push(`/members/${member.id}`)
  } catch {
    errors.value.email = 'Could not save member. Please try again.'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <section>
    <h1>Register Member</h1>
    <p class="muted">Create a new gym member record.</p>

    <form class="card form-grid" @submit.prevent="submit">
      <div>
        <label>Full Name</label>
        <input v-model="form.fullName" />
        <small class="error">{{ errors.fullName }}</small>
      </div>

      <div>
        <label>Email</label>
        <input v-model="form.email" type="email" />
        <small class="error">{{ errors.email }}</small>
      </div>

      <div>
        <label>Phone</label>
        <input v-model="form.phone" />
        <small class="error">{{ errors.phone }}</small>
      </div>

      <div>
        <label>Gender</label>
        <select v-model="form.gender">
          <option value="">Select gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <small class="error">{{ errors.gender }}</small>
      </div>

      <div>
        <label>Date of Birth</label>
        <input v-model="form.dateOfBirth" type="date" />
        <small class="error">{{ errors.dateOfBirth }}</small>
      </div>

      <div>
        <label>Address</label>
        <input v-model="form.address" />
        <small class="error">{{ errors.address }}</small>
      </div>

      <div class="form-actions">
        <button :disabled="saving">
          {{ saving ? 'Saving...' : 'Save Member' }}
        </button>
        <RouterLink to="/members" class="button-link secondary">
          Cancel
        </RouterLink>
      </div>
    </form>
  </section>
</template>