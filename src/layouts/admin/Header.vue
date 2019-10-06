<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn v-if="toolbarButton"
        flat
        dense
        round
        @click="leftDrawerOpen = !leftDrawerOpen"
        aria-label="Menu"
      >
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>
        Quasar App
      </q-toolbar-title>

      <div>
        <q-btn @click="logout">登出</q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: 'AdminHeader',
  data () {
    return {
      toolbarButton: false,
      leftDrawerOpen: false
    }
  },
  methods: {
    logout () {
      this.$q.cookies.remove('token')
      this.$router.push({ path: '/admin/login' })
    }
  }
}
</script>
