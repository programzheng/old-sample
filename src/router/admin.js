import Auth from '../services/auth'

export default function (store) {
  const auth = new Auth(store)
  const routes = [
    {
      path: '/admin',
      component: () => import('layouts/admin/Main.vue'),
      children: [
        { path: '', component: () => import('pages/admin/Index.vue') }
      ],
      beforeEnter: (to, from, next) => {
        //每次切換頁面就驗證token
        if(!auth.admin()){
          next('admin/login')
        }
        next()
      }
    },
    {
      path: '/admin',
      component: () => import('layouts/admin/Main.vue'),
      children: [
        { path: 'login', component: () => import('pages/admin/Login.vue') }
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
