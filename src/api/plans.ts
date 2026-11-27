import { http } from './http'

export interface Plan {
  id: number
  name: string
  price: number
  durationDays: number
  description: string
  isActive: boolean
}

export const plansApi = {
  getAll: () => http<Plan[]>('membershipPlans')
}