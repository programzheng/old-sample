import VueSocketIO from 'vue-socket.io'

export default async ({ Vue }) => {
  const instance = new VueSocketIO({
    debug: true,
    connection: process.env.SOCKETIO
  })
  Vue.use(instance)
}
