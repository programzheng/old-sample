import axios from 'axios'
import { Cookies } from 'quasar'

class API {
    constructor(
        vm, router, store, toast
    ) {
        this.vm = vm
        this.router = router
        this.store = store
        this.toast = toast
        let service = axios.create({
        baseURL: process.env.API,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
        }
        });
        service.interceptors.response.use(response => this.handleSuccess(this, response), error => this.handleError(this, error));
        this.service = service;
    }

    handleSuccess(that, response) {
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

    handleError = (that, error) => {
        if(!error.response){
          that.toast.error('服務器錯誤')
          return;
        }
        let response = error.response
        const wrapperObject = process.env.wrapper
        let wrapperData = {}
        for (let key in wrapperObject) {
          if (response.data[wrapperObject[key]]) {
              wrapperData[key] = response.data[wrapperObject[key]]
          }
        }
        response.data = wrapperData
        that.toast.error(error.response.data.message)
        return response
    }

    // redirectTo = (document, path) => {
    //   document.location = path
    // }

    get(path, params) {
        return this.service.request({
          method: 'GET',
          url: path,
          responseType: 'json',
          params: params
        })
    }

    patch(path, payload) {
      return this.service.request({
        method: 'PATCH',
        url: path,
        responseType: 'json',
        data: payload
      })
    }

    post(path, payload) {
      return this.service.request({
        method: 'POST',
        url: path,
        responseType: 'json',
        data: payload
      })
    }
}

export default API;
