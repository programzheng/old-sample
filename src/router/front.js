
const routes = [
  {
    path: '/',
    component: () => import('layouts/front/Main.vue'),
    children: [
      { path: '', component: () => import('pages/front/Index.vue') }
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

export default routes
