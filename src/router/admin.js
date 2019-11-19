import Auth from '../services/auth'
import { Cookies } from 'quasar'

export default function (store) {
  function validAuth (to, from, next) {
    // 每次切換頁面就驗證token
    if (Cookies.has('token')) {
      let auth = new Auth(store)
      auth.admin().then((status) => {
        if (!status) {
          next('/admin/login')
          return
        }
        next()
      })
    } else {
      next('/admin/login')
    }
  }
  const routes = [
    {
      path: '/admin',
      component: () => import('layouts/admin/Main.vue'),
      beforeEnter: validAuth,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('pages/admin/Index.vue')
        },
        {
          path: 'member',
          name: 'member',
          component: { render: h => h('router-view') },
          children: [
            { path: 'administrator', component: () => import('pages/admin/member/Administrator.vue') }
          ]
        }
      ]
    },
    {
      path: '/admin',
      component: () => import('layouts/admin/Main.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('pages/admin/Login.vue')
        }
      ]
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
