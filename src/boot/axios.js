import axios from 'axios'

export default async ({ Vue }) => {
  const instance = axios.create({
    baseURL: process.env.API,
    timeout: 1000,
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json'
    }
  })
  Vue.prototype.$axios = instance
}
