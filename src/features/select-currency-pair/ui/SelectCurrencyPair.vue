<script setup lang="ts">
import {VSelect} from "vuetify/components";
import {IHistoryItem} from "@entities/settings";


const props = defineProps<{
  items: string[];
  modelValue: string
}>()

let currentValue = props.modelValue;

const emit = defineEmits<{
  changePair: [event: IHistoryItem];
  'update:modelValue': [value: string];
}>()

const onSelect = (value: string | null) => {
  if (!value) {
    return;
  }

  const historyEvent = {
    action: `${currentValue}=>${value}`,
    date: new Date().toLocaleString()
  }

  emit('update:modelValue', value);
  emit('changePair', historyEvent);

  currentValue = value;
}
</script>

<template>
  <!-- eslint-disable vue/v-on-event-hyphenation -->
  <v-select
    :value="modelValue"
    :items="items"
    @update:modelValue="onSelect"
  />
  <!-- eslint-enable vue/v-on-event-hyphenation -->
</template>