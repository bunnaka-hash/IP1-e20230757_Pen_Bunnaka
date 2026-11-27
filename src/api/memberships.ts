import { http } from './http'

export interface Membership {
  id: number
  memberId: number
  planId: number
  startDate: string
  expiryDate: string
  status: string
}

export const membershipsApi = {
  getAll: () => http<Membership[]>('memberships')
}