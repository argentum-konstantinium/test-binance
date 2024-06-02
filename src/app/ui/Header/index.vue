<script setup lang="ts">
import {Logo} from '@shared/ui';
import {VToolbar, VBtn, VMenu, VList, VListItem} from "vuetify/components";
import {mdiMenu} from '@mdi/js'
import {routerConfig} from "@shared/config";
import {useSettingsStore} from "@entities/settings";
import { storeToRefs } from "pinia";

const menuItems = [
  {
    path: routerConfig.ORDER_BOOK.path,
    title: routerConfig.ORDER_BOOK.name
  },
  {
    path: routerConfig.SETTINGS.path,
    title: routerConfig.SETTINGS.name
  }
];

const settingsStore = useSettingsStore();

const {currencyPair} = storeToRefs(settingsStore);
</script>

<template>
  <v-toolbar
    class="header"
    density="compact"
  >
    <div class="d-flex w-100 justify-space-between align-center">
      <router-link
        class="flex-0-0"
        to="/"
      >
        <Logo
          class="d-block header__logo"
          tag="span"
        />
      </router-link>

      <div>
        Current pair: {{ currencyPair }}
      </div>

      <v-menu
        open-on-hover
        open-on-click
        transition="slide-y-transition"
      >
        <template #activator="{props}">
          <v-btn
            slim
            variant="plain"
            v-bind="props"
            :icon="mdiMenu"
          />
        </template>

        <v-list>
          <template
            v-for="item of menuItems"
            :key="item.path"
          >
            <v-list-item v-if="$route.path !== item.path">
              <router-link :to="item.path">
                {{ item.title }}
              </router-link>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
    </div>
  </v-toolbar>
</template>

<style lang="scss" scoped>
.header {
  padding: 10px;

  &__logo {
    max-width: 48px;
  }
}
</style>