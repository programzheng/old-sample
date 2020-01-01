<template>
  <div class="q-pa-md">
    <q-btn label="Add New" @click="addDialog = true"/>
    <q-dialog v-model="addDialog">
      <q-card class="q-pa-md full-width">
        <q-card-section>
          <div class="text-h6">{{title}}</div>
        </q-card-section>
        <q-card-section v-for="(column, columnKey) in columns" :key="columnKey">
          <q-form>
            <!-- 圖片上傳 -->
            <template v-if="column.type === 'image'">
              <Upload
                :label="column.label"
                :name="column.field"
                :value="column.value"
                v-model="column.value"
              />
            </template>
            <!-- 文字輸入 -->
            <q-input
              v-if="column.type === 'input'"
              :label="column.label"
              :name="column.field"
              v-model="column.value"
            >
            </q-input>
            <!-- 多行文字輸入 -->
            <q-input
              v-if="column.type === 'textarea'"
              :label="column.label"
              :name="column.field"
              type="textarea"
              filled
              v-model="column.value"
            >
            </q-input>
          </q-form>
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
  }
}
</script>
