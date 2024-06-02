<script lang="ts" setup>
import HistoryChanges from "./HistoryChanges.vue";
import {IHistoryItem} from "@entities/settings"


defineProps<{
  items: IHistoryItem[]
}>()
</script>

<template>
  <div>
    <div>
      <slot name="actions" />
    </div>

    <HistoryChanges :history="items" />
  </div>
</template>