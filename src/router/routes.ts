import type { RouteRecordRaw } from 'vue-router'
import * as homeRoutes from './homeRoutes'

export const defaultRoute: RouteRecordRaw = {
  name: 'default',
  path: '/',
  redirect: '/home'
}
export const loginRoute: RouteRecordRaw = {
  path: '/login',
  component: () => import('@/views/LoginView.vue'),
  meta: {
    title: '-登录',
    favicon: 'login.ico'
  },
  children: [
    { name: 'login', path: '', component: () => import('@/components/form/LoginForm.vue') },
    {
      name: 'register',
      path: 'register',
      component: () => import('@/components/form/RegisterForm.vue')
    }
  ]
}

export const homeRoute: RouteRecordRaw = {
  name: 'home',
  path: '/home',
  component: () => import('@/views/HomeView.vue'),
  meta: {
    title: '-主页',
    favicon: 'home.ico'
  },
  children: Object.values(homeRoutes),
  redirect: '/home/user/list'
}
