<template>
  <div class="default-layout">
    <HeaderLayout></HeaderLayout>

    <div class="default-layout__inner">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import HeaderLayout from '@/components/layouts/header-layout.vue';
</script>

<style lang="scss" scoped>
  @import '@/styles/components/layouts/default-layout.scss';
</style>
