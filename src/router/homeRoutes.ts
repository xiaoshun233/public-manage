import type { RouteRecordRaw } from 'vue-router'

export const userManageRoute: RouteRecordRaw = {
  name: 'userManage',
  path: 'user',
  children: [
    { path: 'list', component: () => import('@/components/HomeComponents/UserList.vue') },
    { path: 'banlist', component: () => import('@/components/HomeComponents/UserbanList.vue') }
  ],
  redirect: 'user/list',
  meta: {
    title: '-用户管理'
  }
}

export const subjectManageRoute: RouteRecordRaw = {
  name: 'subjectManage',
  path: 'subject',
  children: [
    { path: 'list', component: () => import('@/components/HomeComponents/SubjectList.vue') },
    { path: 'add', component: () => import('@/components/HomeComponents/SubjectAdd.vue') }
  ],
  redirect: 'subject/list',
  meta: {
    title: '-主题管理'
  }
}

export const titleManageRoute: RouteRecordRaw = {
  name: 'titleManage',
  path: 'title',
  children: [
    { path: 'list', component: () => import('@/components/HomeComponents/TitleList.vue') },
    { path: 'add', component: () => import('@/components/HomeComponents/TitleAdd.vue') }
  ],
  redirect: 'title/list',
  meta: {
    title: '-标题管理'
  }
}

export const commentManageRoute: RouteRecordRaw = {
  name: 'commentManage',
  path: 'comment',
  children: [
    { path: 'list', component: () => import('@/components/HomeComponents/CommentList.vue') },
    { path: 'delete', component: () => import('@/components/HomeComponents/CommentDelete.vue') }
  ],
  redirect: 'comment/list',
  meta: {
    title: '-评论管理'
  }
}

export const infoRoutes: RouteRecordRaw = {
  name: 'infoManage',
  path: 'info',
  children: [
    {
      path: 'verificationCode',
      component: () => import('@/components/HomeComponents/VerificationCode.vue')
    },
    {
      path: 'updatePassword',
      component: () => import('@/components/HomeComponents/UpdatePassword.vue')
    }
  ],
  meta: {
    title: '-信息'
  }
}
