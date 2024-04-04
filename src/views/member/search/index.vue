<template>
  <component :is="DefaultLayout">
    <div class="search">
      <Ready></Ready>
    </div>
  </component>
</template>

<script setup lang="ts">
  import searchComposable from '@/composables/views/member/search/index';
  import DefaultLayout from '@/components/layouts/default-layout.vue';
  import Ready from '@/components/elements/ready.vue';

  const {} = searchComposable();
</script>

<style lang="scss" scoped>
  @import '@/styles/member/search/index.scss';
</style>
