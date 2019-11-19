import { Notify } from 'quasar'

class Toast {
  constructor () {
    Notify.setDefaults({
      position: 'top',
      timeout: 2500,
      color: 'red-10',
      textColor: 'white',
      actions: [{ icon: 'close', color: 'white' }]
    })
  }

  error (message) {
    Notify.create({
      message: message }
    )
  }
}

export default new Toast()
