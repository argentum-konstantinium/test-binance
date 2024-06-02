<script lang="ts" setup>
import {VSelect} from "vuetify/components";

defineProps<{
  items: number[];
  modelValue: number
}>()

const emit = defineEmits<{
  changeQuantity: [value: number];
  'update:modelValue': [value: number];
}>()

const onSelect = (value: number | null) => {
  if (!value) {
    return;
  }

  emit('update:modelValue', value);
  emit('changeQuantity', value);
}
</script>

<template>
  <v-select
    density="compact"
    :value="modelValue"
    :items="items"
    @update:model-value="onSelect"
  />
</template>