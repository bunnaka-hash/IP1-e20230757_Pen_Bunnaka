import { http } from './http'

export interface Member {
  id: number
  memberCode: string
  fullName: string
  email: string
  phone: string
  gender: string
  dateOfBirth: string
  address: string
  registeredAt: string
  registeredBy: number
}

export const membersApi = {
  getAll: () => http<Member[]>('members'),

  getById: (id: string | number) =>
    http<Member>(`members/${id}`),

  create: (member: Omit<Member, 'id'>) =>
    http<Member>('members', {
      method: 'POST',
      body: JSON.stringify(member)
    })
}