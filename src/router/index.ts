import { createRouter, createWebHistory, type RouteRecordRaw, type Router } from 'vue-router'
import * as routesModule from './routes'
import { setMeta } from './routerMethod'

const routes: RouteRecordRaw[] = Object.values(routesModule)

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to, from, next) => {
  setMeta(to)
  // 如果是登录或注册页面，则直接放行
  if (to.name === 'login' || to.name === 'register') {
    next()
    return
  }
  next()
})

export default router
