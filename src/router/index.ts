import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import MembersView from '../views/MembersView.vue'
import MemberFormView from '../views/MemberFormView.vue'
import MemberDetailView from '../views/MemberDetailView.vue'
import PlansView from '../views/PlansView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: LoginView },

    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/members',
      component: MembersView,
      meta: { requiresAuth: true }
    },
    {
      path: '/members/new',
      component: MemberFormView,
      meta: { requiresAuth: true }
    },
    {
      path: '/members/:id',
      component: MemberDetailView,
      meta: { requiresAuth: true }
    },
    {
      path: '/plans',
      component: PlansView,
      meta: { requiresAuth: true, role: 'ADMIN' }
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoundView
    }
  ]
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.user) {
    return '/login'
  }

  if (to.meta.role && auth.user?.role !== to.meta.role) {
    return '/dashboard'
  }

  if (to.path === '/login' && auth.user) {
    return '/dashboard'
  }
})

export default router