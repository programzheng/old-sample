<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-center">FrontIndex</div>
        <div class="text-h6 text-center">預留公告</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  created() {
    this.$q.dark.set(false)
  },
  mounted () {
    console.log('I am FrontIndex')
  }
}
</script>
