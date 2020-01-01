<template>
  <div class="q-pa-md">
    <q-btn label="Add New" @click="addDialog = true"/>
    <q-dialog v-model="addDialog">
      <q-card class="q-pa-md">
        <q-card-section>
          <div class="text-h6">{{title}}</div>
        </q-card-section>
        <q-card-section v-for="(column, columnKey) in columns" :key="columnKey">
          <!-- 圖片上傳 -->
          <Upload v-if="column.type === 'image'"/>
          <!-- 文字輸入 -->
          <q-input v-if="column.type === 'input'" :label="column.label"></q-input>
          <!-- 多行文字輸入 -->
          <q-input v-if="column.type === 'textarea'" :label="column.label" type="textarea" filled></q-input>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Upload from '../components/Upload'
export default {
  components: {
    Upload
  },
  props: {
    title: String,
    columns: Array
  },
  data () {
    return {
      addDialog: false
    }
  },
  mounted () {
  }
}
</script>
