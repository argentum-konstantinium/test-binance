<script setup lang="ts">
import {useRouter} from "vue-router";
import {Header} from './ui'

const router = useRouter();

router.afterEach((to) => {
   if (!import.meta.env.SSR) {
     console.log(!import.meta.env.SSR)
     document.title = to.name as string;
   }
})
</script>

<template>
  <div class="app">
    <Header class="app__header" />

    <div class="app__body">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app {
  &__header {
    margin-bottom: 20px;
  }

  &__body {
    padding: 0 10px;
  }
}
</style>