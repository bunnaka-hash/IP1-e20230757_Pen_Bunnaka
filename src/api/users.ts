import { http } from './http'

export interface User {
  id: number
  fullName: string
  email: string
  password: string
  role: 'ADMIN' | 'STAFF'
  isActive: boolean
}

export const usersApi = {
  getAll: () => http<User[]>('users')
}