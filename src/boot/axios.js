import API from '../services/api'
import toast from '../services/notify'

export default async ({ Vue, router, store }) => {
  let instance = new API(Vue, router, store, toast)
  Vue.prototype.$axios = instance
}
