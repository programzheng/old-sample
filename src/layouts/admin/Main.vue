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
  components: {
    Header,
    Menu
  },
  methods: {
    openURL
  },
  beforeRouteUpdate (to, from, next) {
    if (this.$q.cookies.has('token')) {
      let auth = new Auth(this.$store)
      auth.admin().then((status) => {
        if(!status){
          next('/admin/login')
          return
        }
        next()
        return
      })
    }
    else{
      next('/admin/login')
      return
    }
  },
}
</script>

<style>
</style>
