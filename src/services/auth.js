import API from '../services/api'
import toast from '../services/notify'
import { Cookies } from 'quasar'

class Auth {
  constructor(
      store
  ) {
      this.store = store
      this.api = new API(null, null, this.store, toast)
  }
  
  admin(){
    if (Cookies.has('token')) {
      return this.api.post('admin/auth', {}).then((response)=>{
        if (response.data.code === 200) {
          this.store.commit('auth/admin', true)
          return true
        }
        return false
      })
    }
    return false
  }
}
export default Auth;