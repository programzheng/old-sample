<template>
  <q-drawer
    v-model="leftDrawerOpen"
    bordered
    content-class="bg-grey-2"
  >
    <q-list>
      <q-item-label header>功能選項</q-item-label>
      <q-expansion-item
        expand-separator
        icon="people"
        label="會員管理"
        caption="Administrator"
      >
        <q-item clickable v-ripple to="/admin/administrator/account">
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>
            <q-item-label>會員帳號</q-item-label>
            <q-item-label caption>Account</q-item-label>
          </q-item-section>
        </q-item>
      </q-expansion-item>
    </q-list>
  </q-drawer>
</template>

<script>
export default {
  name: 'AdminMenu',
  computed: {
    leftDrawerOpen: {
      get() {
        return this.$store.state.admin.leftDrawerOpen
      },
      set (status) {
        this.$store.commit('admin/leftDrawerOpenStatus', status)
      }
    }
  },
}
</script>
