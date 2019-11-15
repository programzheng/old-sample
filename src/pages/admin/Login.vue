<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-center">登入</div>
      </q-card-section>
      <div class="q-pa-md">
        <q-form
          @submit="doSubmit"
        >
            <div class="row">
              <div class="col col-xs-10 offset-xs-1">
                <q-input standout v-model="account" label="帳號" ref="account" :rules="[ val => val && val.length > 0 || '必填']" />
              </div>
              <div class="col col-xs-10 offset-xs-1">
                <q-input standout v-model="password" label="密碼" ref="password" :rules="[ val => val && val.length > 0 || '必填']" />
              </div>
              <div class="col col-xs-10 offset-xs-1">
                <q-btn class="full-width" label="登入" type="submit" />
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

import jwt from '../../function/jwt'

export default {
  data () {
    return {
      account: 'admin',
      password: 'admin'
    }
  },
  methods: {
    doSubmit () {
      const that = this
      this.$axios.post('admin/login', {
        account: that.account,
        password: that.password
      }).then((response) => {
          // set cookie exp time
          let parseToken = jwt.parseJwt(response.data.value.Token);
          let expDate = new Date(parseToken.exp * 1000).toUTCString()
          this.$q.cookies.set('token', response.data.value.Token, {
            expires: expDate
          })
          that.$router.push({ path: '/admin' })
      })
    }
  }
}
</script>
