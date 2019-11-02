<template>
  <q-page class="flex flex-center bg-primary">
    <q-card class="bg-grey-10 text-white">
      <q-card-section>
        <div class="text-h6 text-center text-white">登入</div>
      </q-card-section>
      <div class="q-pa-md">
        <q-form
          @submit="doSubmit"
        >
            <div class="row">
              <div class="col col-xs-10 offset-xs-1">
                <q-input dark standout v-model="account" label="帳號" ref="account" :rules="[ val => val && val.length > 0 || '必填']" />
              </div>
              <div class="col col-xs-10 offset-xs-1">
                <q-input dark standout v-model="password" label="密碼" ref="password" :rules="[ val => val && val.length > 0 || '必填']" />
              </div>
              <div class="col col-xs-10 offset-xs-1">
                <q-btn class="bg-primary text-white full-width" label="登入" type="submit" />
              </div>
            </div>
        </q-form>
      </div>
    </q-card>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'AdminLogin',
  data () {
    return {
      account: 'admin',
      password: 'admin'
    }
  },
  methods: {
    doSubmit () {
      const self = this
      this.$axios.post('admin/login', {
        account: self.account,
        password: self.password
      },(data) => {
          console.log(data)
          // set cookie exp time
          let expDate = new Date(data.value.Exp * 1000).toUTCString()
          this.$q.cookies.set('token', data.value.Token, {
            expires: expDate
          })
          self.$router.push({ path: '/admin' })
      })
    }
  }
}
</script>
