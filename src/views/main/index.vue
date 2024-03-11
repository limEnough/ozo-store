<template>
  <component :is="DefaultLayout">
    <div class="main"></div>
  </component>
</template>

<script setup lang="ts">
  // import mainComposable from '@/composables/src/views/main/index';
  import DefaultLayout from '@/components/layouts/default-layout.vue';

  // const {} = mainComposable();
</script>

<style lang="scss" scoped>
  /* @import '@/styles/views/main.scss'; */
</style>
