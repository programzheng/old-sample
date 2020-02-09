import axios from 'axios'
import { Cookies } from 'quasar'

class API {
  constructor (
    vm, router, store, toast
  ) {
    this.vm = vm
    this.router = router
    this.store = store
    this.toast = toast
    let service = axios.create({
      baseURL: process.env.API,
      headers: this.headers()
    })
    service.interceptors.response.use(response => this.handleSuccess(this, response), error => this.handleError(this, error))
    this.service = service
  }

  headers () {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Cookies.get('token')}`
    }
  }

  handleSuccess (that, response) {
    const wrapperObject = process.env.wrapper
    let wrapperData = {}
    for (let key in wrapperObject) {
      if (response.data[wrapperObject[key]]) {
        wrapperData[key] = response.data[wrapperObject[key]]
      }
    }
    response.data = wrapperData
    return response
  }

  handleError (that, error) {
    let response = error.response
    if (!response) {
      that.toast.error('服務器錯誤')
      return Promise.reject('服務器錯誤')
    }
    const wrapperObject = process.env.wrapper
    let wrapperData = {}
    for (let key in wrapperObject) {
      if (response.data[wrapperObject[key]]) {
        wrapperData[key] = response.data[wrapperObject[key]]
      }
    }
    response.data = wrapperData
    that.toast.error(error.response.data.message)
    return Promise.reject(error.response.data.message)
  }

  // redirectTo = (document, path) => {
  //   document.location = path
  // }

  get (path, params) {
    return this.service.request({
      method: 'GET',
      url: path,
      responseType: 'json',
      params: params
    })
  }

  post (path, payload) {
    return this.service.request({
      method: 'POST',
      url: path,
      responseType: 'json',
      data: payload
    })
  }

  patch (path, payload) {
    return this.service.request({
      method: 'PATCH',
      url: path,
      responseType: 'json',
      data: payload
    })
  }
}

export default API
