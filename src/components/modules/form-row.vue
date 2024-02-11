<template>
  <div class="form-row-component">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import formRowComposable, { formRowEmits, formRowProps } from '@/composables/modules/form-row';

  defineEmits(formRowEmits);
  defineProps(formRowProps);

  formRowComposable();
</script>

<style lang="scss" scoped>
  @import '@/styles/components/modules/form-row.scss';
</style>
