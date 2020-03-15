<template>
  <div class="q-pa-md">
    <q-btn label="Add New" @click="addDialog = true"/>
    <q-dialog v-model="addDialog">
      <q-card class="q-pa-md full-width">
        <q-card-section>
          <div class="text-h6">{{title}}</div>
        </q-card-section>
        <q-form>
          <q-card-section v-for="(column, columnKey) in columns" :key="columnKey">
              <!-- 圖片上傳 -->
              <template v-if="column.type === 'files'">
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
          </q-card-section>
        </q-form>
        <q-btn label="Add" @click="add()"/>
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
    API: String,
    columns: Array
  },
  data () {
    return {
      addDialog: false,
      addRow: Array
    }
  },
  methods: {
    formatColumn () {
      // 使用map做deep copy
      let columns = this.columns.map(e => {
        const column = { ...e }
        column.type === 'files' && (column.value = JSON.stringify(column.value))
        return column
      })
      return columns
    },
    formatRow (columns) {
      const rows = {}
      for (let i in columns) {
        if (columns[i].field !== 'id') {
          rows[columns[i].field] = columns[i].value
        }
      }
      return rows
    },
    add () {
      // let columns = this.formatColumn()
      let rows = this.formatRow(this.columns)
      this.$axios.post(this.API, rows).then(response => {
        if (response.status) {
          this.$axios.toast.success('新增成功')
          this.addDialog = false
        }
      })
    }
  }
}
</script>
