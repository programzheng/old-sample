import API from '../services/api'
import { Cookies } from 'quasar'

export default function (store) {
  //每次切換頁面就驗證token
  if (Cookies.has('token')) {
    const instance = new API(null, null, store, null)
    instance.post('admin/auth', {}, () => {})
  }

  const routes = [
    {
      path: '/admin',
      component: () => import('layouts/admin/Main.vue'),
      children: [
        { path: '', component: () => import('pages/admin/Index.vue') }
      ],
      beforeEnter: (to, from, next) => {
        if (!Cookies.has('token') && !store.getters['auth/getAuth']) {
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
        if (Cookies.has('token') && store.getters['auth/getAuth']) {
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

  return routes
}
