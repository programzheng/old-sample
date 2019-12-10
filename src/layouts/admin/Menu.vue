<template>
  <q-drawer
    v-model="leftDrawerOpen"
    bordered
  >
    <q-list>
      <q-item-label header>功能選項</q-item-label>
      <q-expansion-item
        expand-separator
        icon="people"
        label="會員管理"
        caption="member"
      >
        <q-expansion-item
          expand-separator
          icon="vpn_key"
          label="會員帳號"
          caption="Account"
        >
          <q-item clickable v-ripple to="/admin/member/administrator">
            <q-item-section avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>管理員帳號</q-item-label>
              <q-item-label caption>Administrator</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-expansion-item>
            <q-expansion-item
        expand-separator
        icon="description"
        label="文章系統"
        caption="post"
      >
          <q-item clickable v-ripple to="/admin/post/index">
            <q-item-section avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>文章管理</q-item-label>
              <q-item-label caption>Post</q-item-label>
            </q-item-section>
          </q-item>
      </q-expansion-item>
    </q-list>
  </q-drawer>
</template>

<script>
export default {
  computed: {
    leftDrawerOpen: {
      get () {
        return this.$store.state.admin.leftDrawerOpen
      },
      set (status) {
        this.$store.commit('admin/leftDrawerOpenStatus', status)
      }
    }
  }
}
</script>
