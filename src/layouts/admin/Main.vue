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

export default {
  name: 'AdminMain',
  components: {
    Header,
    Menu
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
