<template>
  <div class="form-component">
    <div class="form-component__cont">
      <slot></slot>
    </div>

    <div
      v-if="slots.actions"
      class="form-component__actions"
    >
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import formComposable from '@/composables/modules/form';

  const { slots } = formComposable();
</script>

<style lang="scss" scoped>
  @import '@/styles/components/modules/form.scss';
</style>
