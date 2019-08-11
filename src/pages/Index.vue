<template>
  <q-page class="flex flex-center">
  <div class="q-pa-xs">
    <!-- Stack the columns on mobile by making one full-width and the other half-width -->
    <div class="row">
      <div class="col col-xs-12"><q-input standout="bg-primary text-white" v-model="account" label="帳號" ref="account" @keyup.enter="$refs.password.focus()" /></div>
      <div class="col col-xs-12"><q-input standout="bg-primary text-white" v-model="password" label="密碼" ref="password" @keyup.enter="doSubmit" /></div>
      <div class="col col-xs-4 offset-xs-8"><q-btn class="full-width" color="black" label="送出" ref="submit" @click="doSubmit" /></div>
    </div>
  </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    doSubmit () {

    }
  }
}
</script>
