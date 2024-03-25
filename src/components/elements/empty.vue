<template>
  <div class="empty-component">
    <!-- empty 문구 영역 -->
    <div class="empty-component__text">
      <slot name="text"> No Results! </slot>
    </div>

    <!-- empty 버튼 영역 -->
    <div class="empty-component__action">
      <slot name="button"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  // declare additional options
  export default {
    inheritAttrs: false,
  };
</script>

<style lang="scss" scoped>
  @import '@/styles/components/elements/empty.scss';
</style>
