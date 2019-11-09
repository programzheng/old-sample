<template>
  <q-header elevated class="bg-grey-10">
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
        Project Name
      </q-toolbar-title>

      <div>
        <q-btn v-if="auth" to="/admin">回首頁</q-btn>
        <q-btn @click="logout">登出</q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  computed: {
    auth: {
      get () {
        return this.$store.state.auth.admin
      },
      set (status) {
        this.$store.commit('auth/admin', status)
      }
    },
    toolbarButton: {
      get () {
        return this.$store.state.admin.toolbarButton
      },
      set (status) {
        this.$store.commit('admin/toolbarButtonStatus', status)
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
      this.$q.cookies.remove('token')
      this.auth = false
      this.toolbarButton = false
      this.$router.push({ path: '/admin/login' })
    }
  }
}
</script>
