import { Cookies } from 'quasar'

import store from '../store/index.js'

const home = {
  path: '/',
  component: () => import('layouts/Back.vue'),
  children: [
    {
      path: '/',
      name: 'home',
      component: () => import('pages/Home.vue')
    },
    {
      path: 'admin',
      name: 'admin',
      component: () => import('pages/Admin.vue')
    }
  ],
  beforeEnter: (to, from, next) => {
    console.log(store.state)
    if (!Cookies.has('token')) {
      next('login')
    } else {
      next()
    }
  }
}

const login = {
  path: '/',
  component: () => import('layouts/Back.vue'),
  children: [
    {
      path: 'login',
      name: 'login',
      component: () => import('pages/Login.vue')
    }
  ],
  beforeEnter: (to, from, next) => {
    if (Cookies.has('token')) {
      next('')
    } else {
      next()
    }
  }
}

const routes = [
  home,
  login
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
