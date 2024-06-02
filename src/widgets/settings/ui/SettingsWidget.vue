<script setup lang="ts">
import {Settings} from "@entities/settings";
import {SelectCurrencyPair} from "../../../features/select-currency-pair";
import {currencyPairsList} from "@shared/config";
import {IHistoryItem} from "@entities/settings";
import {useSettingsStore} from "@entities/settings";
import {storeToRefs} from "pinia";

const settingsStore = useSettingsStore();

const {historyChanges, currencyPair} = storeToRefs(settingsStore);

const onHistoryChange = (event: IHistoryItem) => {
  historyChanges.value.push(event);
}
</script>

<template>
  <div>
    <Settings :items="historyChanges">
      <template #actions>
        <SelectCurrencyPair
          v-model="currencyPair"
          :items="currencyPairsList"
          @change-pair="onHistoryChange"
        />
      </template>
    </Settings>
  </div>
</template>