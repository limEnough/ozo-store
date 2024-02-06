<template>
  <Desktop :is="!isMobile">
    <RouterView> </RouterView>
  </Desktop>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import { isMobile } from '@/stores/common';
  import Desktop from '@/components/layouts/desktop.vue';
</script>

<style lang="scss">
  @import '@/styles/app.scss';
</style>
