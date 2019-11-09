<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-center">AdminIndex</div>
        <dir>{{store}}</dir>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  computed: {
    store: {
      get () {
        return this.$store.state.auth.admin
      }
    }
  }
}
</script>
