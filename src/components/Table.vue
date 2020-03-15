<template>
    <q-table
      :title="title"
      :data="data"
      :columns="columns"
      row-key="id"
      :pagination.sync="pagination"
      :filter="filter"
      @request="onRequest"
      binary-state-sort
    >
      <template v-slot:top-right>
        <Action title="add" :columns="columns" :API="API"></Action>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

    </q-table>
</template>

<style>
</style>

<script>
import Action from '../components/Action'
export default {
  components: {
    Action
  },
  props: {
    title: String,
    paginationSetting: Object,
    API: String,
    columns: Array
  },
  data () {
    return {
      filter: '',
      pagination: this.paginationSetting,
      loading: false,
      data: []
    }
  },
  mounted () {
    // get initial data from server (1st page)
    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
  },
  methods: {
    onRequest (props) {
      let { page, rowsPerPage, rowsNumber, sortBy, descending } = props.pagination
      let filter = props.filter

      this.loading = true
      // calculate starting row of data
      let startRow = (page - 1) * rowsPerPage
      // get all rows if "All" (0) is selected
      let fetchCount = rowsPerPage === 0 ? rowsNumber : rowsPerPage
      // update rowsCount with appropriate value
      let returnedData = this.getDataFromSever(startRow, fetchCount, filter, sortBy, descending)

      this.pagination.rowsNumber = returnedData.length
      // clear out existing data and add new
      this.data.splice(0, this.data.length, ...returnedData)

      // update rowsCount with appropriate value
      this.pagination.rowsNumber = returnedData.length
      // don't forget to update local pagination object
      this.pagination.page = page
      this.pagination.rowsPerPage = rowsPerPage
      this.pagination.sortBy = sortBy
      this.pagination.descending = descending

      // ...and turn of loading indicator
      this.loading = false
    },
    getDataFromSever (startRow, count, filter, sortBy, descending) {
      this.$axios.get(this.API, {
        page_num: process.env.dataTable.page_num,
        page_size: process.env.dataTable.page_size
      }).then(response => {
        this.data = response.data.value.list
      })
      // handle sortBy
      if (sortBy) {
        this.data.sort((a, b) => {
          let x = descending ? b : a
          let y = descending ? a : b
          if (sortBy === 'desc') {
            // string sort
            return x[sortBy] > y[sortBy] ? 1 : x[sortBy] < y[sortBy] ? -1 : 0
          } else {
            // numeric sort
            return parseFloat(x[sortBy]) - parseFloat(y[sortBy])
          }
        })
      }

      return this.data
    }
  }
}
</script>
