<template>
    <q-page class="flex flex-center">
      <Table title="文章管理" :pagination-setting="pagination" :columns="columns"></Table>
      <Dialog title="add" :dialog="dialog" :columns="columns"></Dialog>
    </q-page>
</template>

<script>
import Table from '../../../components/Table'
import Dialog from '../../../components/Dialog'
export default {
  components: {
    Table,
    Dialog
  },
  data () {
    return {
      dialog: false,
      pagination: {
        sortBy: 'id',
        descending: false,
        page: 1,
        rowsPerPage: 3,
        rowsNumber: 10
      },
      columns: [
        {
          name: 'id',
          required: true,
          label: 'id',
          align: 'center',
          field: row => row.ID,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'title', type: 'input', align: 'center', label: '標題', field: 'Title', sortable: true },
        { name: 'summary', type: 'textarea', align: 'center', label: '簡介', field: 'Summary', sortable: true }
      ],
      data: []
    }
  }
}
</script>
