<script setup lang="ts">
defineProps({
  tag: {
    type: String,
    default: 'div'
  }
})
</script>

<template>
  <component
    :is="tag"
    class="logo"
  >
    <img
      class="logo__img"
      src="@shared/assets/logo.png"
      alt="logotype"
    >
  </component>
</template>

<style lang="scss" scoped>
.logo {
  &__img {
    width: 100%;
    display: block;
  }
}
</style>