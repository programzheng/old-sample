import { Cookies } from 'quasar'

import store from '../store/index.js'

const routes = [
  {
    path: '/admin',
    component: () => import('layouts/admin/Main.vue'),
    children: [
      { path: '', component: () => import('pages/admin/Index.vue') }
    ],
    beforeEnter: (to, from, next) => {
      console.log(store.state)
      if (!Cookies.has('token')) {
        next('admin/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/admin',
    component: () => import('layouts/admin/Main.vue'),
    children: [
      { path: 'login', component: () => import('pages/admin/Login.vue') }
    ],
    beforeEnter: (to, from, next) => {
      if (Cookies.has('token')) {
        next('admin')
      } else {
        next()
      }
    }
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
