<template>
    <q-uploader
      :label="title"
      :url="url"
      :headers="headers"
      multiple
      batch
    />
</template>

<script>
export default {
  props: {
    title: String
  },
  data () {
    return {
      url: this.apiSetting.baseURL + '/files',
      headers: [{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.apiSetting.headers.Authorization
        // 'Accept': this.apiSetting.headers.Accept,
        // 'Content-Type': this.apiSetting.headers.Content-Type,
        // 'Authorization': this.apiSetting.headers.Authorization,
      }]
    }
  },
  beforeCreate () {
    // 抓取預設api設定
    this.apiSetting = this.$axios.service.defaults
    console.log(this.apiSetting.headers)
  }
}
</script>
