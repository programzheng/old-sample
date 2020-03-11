<template>
    <q-uploader
      class="full-width"
      :label="title"
      :factory="factoryFn"
      @uploaded="fileUploaded"
      multiple
      batch
    >
      <template v-slot:list="scope">
        <q-list separator>

          <q-item v-for="file in scope.files" :key="file.name">
            <q-item-section>
              <q-item-label class="full-width ellipsis">
                {{ file.name }}
              </q-item-label>

              <q-item-label caption>
                Status: {{ file.__status }}
              </q-item-label>

              <q-item-label caption>
                {{ file.__sizeLabel }} / {{ file.__progressLabel }}
              </q-item-label>
            </q-item-section>

            <q-item-section
              v-if="file.__img"
              thumbnail
              class="gt-xs"
            >
              <img :src="file.__img.src">
            </q-item-section>

            <q-item-section top side>
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="delete"
                @click="scope.removeFile(file)"
              />
            </q-item-section>
          </q-item>

        </q-list>
      </template>
    </q-uploader>
</template>

<script>
export default {
  props: {
    title: String,
    value: Array
  },
  data () {
    return {
      url: this.apiSetting.baseURL + 'files'
    }
  },
  beforeCreate () {
    // 抓取預設api設定
    this.apiSetting = this.$axios.service.defaults
  },
  mounted () {
    console.log(this.value)
  },
  methods: {
    factoryFn (file) {
      return new Promise((resolve, reject) => {
        resolve({
          url: this.url,
          method: 'POST',
          headers: [
            { name: 'Authorization', value: this.apiSetting.headers.Authorization }
          ]
        })
      })
    },
    fileUploaded ({ file, xhr }) {
      const response = JSON.parse(xhr.response)
      const files = [ ...response.Value ]
      console.log(files)
      files.forEach(file => {
        this.value.push(file.HashID)
      })
      console.log(this.value)
    }
  }
}
</script>
