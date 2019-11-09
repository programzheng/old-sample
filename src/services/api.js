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
        that.store.commit('auth/admin', true)
        return response
    }

    handleError = (that, error) => {
        let response = error.response
        const wrapperObject = process.env.wrapper
        let wrapperData = {}
        for (let key in wrapperObject) {
        if (response.data[wrapperObject[key]]) {
            wrapperData[key] = response.data[wrapperObject[key]]
        }
        }
        response.data = wrapperData
        switch (error.response.status) {
        case 401:
            that.store.commit('auth/admin', false)
            that.router.push({ path: 'login' })
            break;
        case 404:
            that.router.push({ path: '404' })
            break;
        default:
            that.toast.error(error.response.data.message)
            break;
        }
        return new Promise(() => {})
    }

    // redirectTo = (document, path) => {
    //   document.location = path
    // }

    get(path, callback) {
        return this.service.get(path).then(
        (response) => callback(response.data)
        );
    }

    patch(path, payload, callback) {
        return this.service.request({
        method: 'PATCH',
        url: path,
        responseType: 'json',
        data: payload
        }).then((response) => callback(response.data));
    }

    post(path, payload, callback) {
        return this.service.request({
        method: 'POST',
        url: path,
        responseType: 'json',
        data: payload
        }).then((response) => callback(response.data));
    }
}

export default API;