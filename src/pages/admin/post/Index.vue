<template>
    <q-page class="flex flex-center">
      <Table
        title="文章管理"
        :API="API"
        :pagination-setting="pagination"
        :columns="columns"
      />
    </q-page>
</template>

<script>
import Table from '../../../components/Table'
export default {
  components: {
    Table
  },
  data () {
    return {
      API: 'posts',
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
          field: 'id',
          sortable: true
        },
        {
          name: 'files',
          type: 'files',
          align: 'center',
          label: '圖片',
          field: 'files',
          sortable: true,
          value: []
        },
        {
          name: 'title',
          type: 'input',
          align: 'center',
          label: '標題',
          field: 'title',
          sortable: true,
          value: ''
        },
        {
          name: 'summary',
          type: 'textarea',
          align: 'center',
          label: '簡介',
          field: 'summary',
          sortable: true,
          value: ''
        }
      ],
      data: []
    }
  }
}
</script>
