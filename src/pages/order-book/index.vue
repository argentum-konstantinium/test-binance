<script setup lang="ts">
import {OrderBookWidget} from "@widgets/order-book";
import {onMounted, ref, onUnmounted} from "vue";
import {IDepthElem, useOrderBookStore} from "@entities/order-book";
import {storeToRefs} from "pinia";
import {useSettingsStore} from "@entities/settings";

const orderBookStore = useOrderBookStore();
const settingsStore = useSettingsStore();
const {limit, asks, bids, lastUpdateId } = storeToRefs(orderBookStore);
const {currencyPair} = storeToRefs(settingsStore);

const socket = ref<WebSocket>();

onMounted(() => {
  orderBookStore.fetchOrderBook({
    limit: limit.value,
    symbol: currencyPair.value
  });

  socket.value = new WebSocket(`wss://stream.binance.com:9443/ws/${currencyPair.value.toLowerCase()}@depth`);

  const prepareMarketDepthElems = (elems: string[][]) => {
    const newElems: IDepthElem[] = [];

    for (const item of elems) {
      const [price, quantity] = item;
      const total = (parseFloat(price) * parseFloat(quantity)).toFixed(8);

      const preparedElem: IDepthElem = {
        price,
        quantity,
        total
      }

      newElems.push(preparedElem);
    }

    return newElems;
  }

  socket.value.onmessage = async (event) => {
    const data = JSON.parse(event.data);
    const {u, U, a, b} = data;

    if (u <= lastUpdateId.value) {
      return
    }

    if ((U <= (lastUpdateId.value + 1)) && (u >= (lastUpdateId.value + 1))) {
      if (a.length > 0) {
        const preparedAsks = prepareMarketDepthElems(a);
        orderBookStore.updateAsks(preparedAsks);
      }

      if (b.length > 0) {
        const preparedBids = prepareMarketDepthElems(b);
        orderBookStore.updateBids(preparedBids)
      }
      lastUpdateId.value = u;
    } else {
      await orderBookStore.fetchOrderBook({
        limit: limit.value,
        symbol: currencyPair.value
      })
    }
  }
});

onUnmounted(() => {
  socket.value?.close()
});
</script>
<template>
  <OrderBookWidget
    :asks="asks"
    :bids="bids"
  />
</template>