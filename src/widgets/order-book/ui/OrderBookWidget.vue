<script lang="ts" setup>
import {OrderBook} from "@entities/order-book";
import {SelectItemsPerTable} from "@features/select-items-per-table";
import {useOrderBookStore} from "@entities/order-book";
import {useSettingsStore} from "@entities/settings";
import {storeToRefs} from "pinia";
import {itemsPerTableList} from "@shared/config/constants/itemsPerTable.ts";

const orderBookStore = useOrderBookStore();
const settingsStore = useSettingsStore();

const {limit, bids, asks} = storeToRefs(orderBookStore);
const {currencyPair} = storeToRefs(settingsStore);

const onChangeQuantity = async (value: number) => {
  limit.value = value;

  await orderBookStore.fetchOrderBook({
    limit: limit.value,
    symbol: currencyPair.value
  })
}

</script>

<template>
  <OrderBook
    :bids="bids"
    :asks="asks"
  >
    <template #actions>
      <div class="text-sm-h6 mb-2">
        Select items quantity in table
      </div>

      <SelectItemsPerTable
        v-model="limit"
        :items="itemsPerTableList"
        @change-quantity="onChangeQuantity"
      />
    </template>
  </OrderBook>
</template>