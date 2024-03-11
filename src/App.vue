<template>
  <DesktopLayout :is="!isMobile">
    <RouterView> </RouterView>
  </DesktopLayout>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import { isMobile } from '@/composables/use/use-device';
  import DesktopLayout from '@/components/layouts/desktop-layout.vue';
</script>

<style lang="scss">
  @import '@/styles/app.scss';
</style>
