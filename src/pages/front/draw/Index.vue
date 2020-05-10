<template>
  <q-page class="flex flex-center">
    <canvas ref="board"></canvas>
  </q-page>
</template>

<style>
</style>

<script>

import { create } from 'simple-drawing-board'

export default {
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    customEmit: function (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  mounted () {
    this.createSdb()
    this.$socket.emit('notice', '1234test')
  },
  methods: {
    createSdb () {
      const sdb = create(this.$refs.board)
      console.log(sdb)
    }
  }
}
</script>
