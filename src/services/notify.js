import { Notify } from 'quasar'

class Toast {
  info (message) {
    Notify.setDefaults({
      position: 'top',
      timeout: 2500,
      color: 'blue-10',
      textColor: 'white',
      actions: [{ icon: 'close', color: 'white' }]
    })
    Notify.create({
      message: message }
    )
  }

  success (message) {
    Notify.setDefaults({
      position: 'top',
      timeout: 2500,
      color: 'green-10',
      textColor: 'white',
      actions: [{ icon: 'close', color: 'white' }]
    })
    Notify.create({
      message: message }
    )
  }

  error (message) {
    Notify.setDefaults({
      position: 'top',
      timeout: 2500,
      color: 'red-10',
      textColor: 'white',
      actions: [{ icon: 'close', color: 'white' }]
    })
    Notify.create({
      message: message }
    )
  }
}

export default new Toast()
