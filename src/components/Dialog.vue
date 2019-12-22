<template>
  <q-dialog v-model="dialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{title}}</div>
      </q-card-section>
      <q-card-section v-for="(column, columnKey) in columns" :key="columnKey">
        <q-input v-if="columns.type === 'input'"></q-input>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    title: String,
    columns: Object
  }
}
</script>
