<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn v-if="toolbarButton"
        flat
        dense
        round
        @click="leftDrawerOpenStatus()"
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
  computed: {
    toolbarButton: {
      get () {
        return this.$store.state.admin.toolbarButton
      }
    },
    leftDrawerOpen: {
      get () {
        return this.$store.state.admin.leftDrawerOpen
      },
      set (status) {
        this.$store.commit('admin/leftDrawerOpenStatus', status)
      }
    }
  },
  methods: {
    leftDrawerOpenStatus () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    logout () {
      this.$store.commit('admin/toolbarButtonStatus', false)
      this.$q.cookies.remove('token')
      this.$router.push({ path: '/admin/login' })
    }
  }
}
</script>
