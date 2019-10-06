import axios from 'axios'
import { Cookies } from 'quasar'

import store from '../store'

if (Cookies.has('token')) {
  const instance = axios.create({
    baseURL: process.env.API,
    timeout: 1000,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Cookies.get('token')}`
    }
  })
  instance({
    method: 'post',
    url: 'admin/auth'
  })
    .then(response => {
      if (response.data.Result.Value) {
        store().commit('auth/auth', true)
      } else {
        store().commit('auth/auth', false)
      }
    })
}

const routes = [
  {
    path: '/admin',
    component: () => import('layouts/admin/Main.vue'),
    children: [
      { path: '', component: () => import('pages/admin/Index.vue') }
    ],
    beforeEnter: (to, from, next) => {
      console.log(store().state.admin)
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
