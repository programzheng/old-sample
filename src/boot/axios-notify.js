import axios from 'axios'
// quasar plugins
import { Notify, Cookies } from 'quasar'

export default async ({ Vue }) => {
  Notify.setDefaults({
    position: 'top',
    timeout: 2500,
    color: 'red-10',
    textColor: 'white',
    actions: [{ icon: 'close', color: 'white' }]
  })

  const instance = axios.create({
    baseURL: process.env.API,
    timeout: 1000,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Cookies.get('token')}`
    }
  })
  // response handler
  instance.interceptors.response.use(function (response) {
    if (response.data.Result.Error !== null) {
      Notify.create(response.data.Result.Error)
      return new Promise(() => {})
    }
    return response
  })
  Vue.prototype.$axios = instance
}
