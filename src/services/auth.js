import API from '../services/api'
import toast from '../services/notify'

class Auth {
  constructor (
    store
  ) {
    this.store = store
    this.api = new API(null, null, this.store, toast)
  }

  admin () {
    return this.api.post('admin/auth', {}).then((response) => {
      if (response.data.code === 200) {
        this.store.commit('auth/admin', true)
        this.store.commit('admin/toolbarButtonStatus', true)
        return true
      }
    }).catch(() => {
      return false
    })
  }
}
export default Auth
