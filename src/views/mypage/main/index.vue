<template>
  <component :is="DefaultLayout">
    <div class="mypageMain"></div>
  </component>
</template>

<script setup lang="ts">
  // import mypageMainComposable from '@/composables/src/views/mypage/main/index';
  import DefaultLayout from '@/components/layouts/default-layout.vue';

  // const {} = mypageMainComposable();
</script>

<style lang="scss" scoped>
  @import '@/styles/mypage/main/index.scss';
</style>
