<script lang="ts" setup>
import {VDataTable} from "vuetify/components";
import {IHistoryItem} from "@entities/settings/model";

interface IProps {
  history: IHistoryItem[]
}

defineProps<IProps>()

const headers = [
  {
    title: 'Action',
    key: 'action'
  },
  {
    title: "Date",
    key: "date",
  }
]
</script>

<template>
  <v-data-table
    class="table"
    item-key="date"
    density="compact"
    fixed-header
    :headers="headers"
    :items="history"
  />
</template>

<style lang="scss" scoped>
.table {
  max-height: 58vh;
}
</style>