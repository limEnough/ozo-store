<template>
  <div class="goods-component"></div>
</template>

<script lang="ts">
  // declare additional options
  export default {
    inheritAttrs: false,
  };
</script>

<script setup lang="ts">
  import goodsComposable, { goodsEmits, goodsProps } from '@/composables/modules/goods';

  const emits = defineEmits(goodsEmits);
  const props = defineProps(goodsProps);

  const {} = goodsComposable(emits, props);
</script>

<style lang="scss" scoped>
  @import '@/styles/components/modules/goods.scss';
</style>
