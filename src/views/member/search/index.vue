<template>
  <component :is="DefaultLayout">
    <div class="search"></div>
  </component>
</template>

<script setup lang="ts">
  import searchComposable from '@/composables/views/member/search/index';
  import DefaultLayout from '@/components/layouts/default-layout.vue';

  const {} = searchComposable();
</script>

<style lang="scss" scoped>
  @import '@/styles/member/search/index.scss';
</style>
