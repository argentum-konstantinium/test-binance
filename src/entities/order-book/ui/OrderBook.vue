<script lang="ts" setup>
import {VDataTableVirtual, VCard, VCardItem} from "vuetify/components";
import {IDepthElem} from "@entities/order-book/api";
import {ref, watch} from "vue";
import {useWindowSize} from '@vueuse/core'

defineProps<{
  bids: IDepthElem[];
  asks: IDepthElem[];
}>()


const headers = ref([
  {
    title: 'Price',
    key: 'price',
    sortable: false
  },
  {
    title: 'Total',
    key: 'total',
    sortable: false
  }
]);

const {width} = useWindowSize();

watch(width, () => {
  if (width.value < 768 && headers.value.length > 2) {
    headers.value = [
      {
        title: 'Price',
        key: 'price',
        sortable: false
      },
      {
        title: 'Total',
        key: 'total',
        sortable: false
      }
    ]
  }

  if (width.value >= 768 && headers.value.length < 3) {
    headers.value = [
      {
        title: 'Price',
        key: 'price',
        sortable: false
      },
      {
        title: 'Quantity',
        key: 'quantity',
        sortable: false
      },
      {
        title: 'Total',
        key: 'total',
        sortable: false
      }
    ]
  }
})
</script>

<template>
  <div class="order-book">
    <div class="order-book__header">
      <slot name="actions" />
    </div>

    <div class="order-book__body">
      <v-card
        color="red"
        variant="outlined"
        class="mb-4"
      >
        <v-card-item class="pa-0">
          <v-data-table-virtual
            class="order-book__table order-book__table--asks"
            fixed-header
            :headers="headers"
            :items="asks"
          />
        </v-card-item>
      </v-card>

      <v-card
        color="green"
        variant="outlined"
      >
        <v-card-item class="pa-0">
          <v-data-table-virtual
            class="order-book__table order-book__table--bids"
            fixed-header
            :headers="headers"
            :items="bids"
          />
        </v-card-item>
      </v-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-book {
  &:deep(.v-table) {
    --v-table-header-height: 40px;
    --v-table-row-height: 40px;
    font-size: 12px;
  }

  &__table {
    max-height: 30vh;

    @media (min-width: 400px) {
      max-height: 35vh;
    }

    &--asks {
      background: rgb(219, 44, 44);
      color: white;
      font-weight: bold;

      &:deep(.v-data-table__th) {
        background: rgb(219, 44, 44) !important;
      }
    }

    &--bids {
      background: rgb(83, 129, 69);
      color: white;
      font-weight: bold;

      &:deep(.v-data-table__th) {
        background: rgb(83, 129, 69) !important;
      }
    }
  }
}
</style>