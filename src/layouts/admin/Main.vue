<template>
  <q-layout view="lHh Lpr lFf">
    <Header />
    <Menu />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from './Header'
import Menu from './Menu'

import { openURL } from 'quasar'

import Auth from '../../services/auth'

export default {
  data() {
    return {
      auth: new Auth(this.$store)
    }
  },
  components: {
    Header,
    Menu
  },
  methods: {
    openURL
  },
  beforeRouteUpdate (to, from, next) {
    //每次切換頁面就驗證token
    if(!this.auth.admin()){
      next('admin/login')
    }
    this.$store.commit('admin/toolbarButtonStatus', true)
    next()
  },
}
</script>

<style>
</style>
