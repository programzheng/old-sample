import Auth from '../services/auth'

export default function (store) {
  const auth = new Auth(store)
  const routes = [
    {
      path: '/admin',
      component: () => import('layouts/admin/Main.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('pages/admin/Index.vue'),
        },
        {
          path: 'administrator',
          name: 'administrator',
          component: { render: h => h('router-view') },
          children: [
            { path: 'account', component: () => import('pages/admin/administrator/Account.vue') },
          ]
        }
      ],
      beforeEnter: (to, from, next) => {
        //每次切換頁面就驗證token
        if(!auth.admin()){
          next('admin/login')
        }
        store.commit('admin/toolbarButtonStatus', true)
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
