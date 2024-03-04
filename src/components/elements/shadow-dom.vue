<template>
  <div
    ref="refHTMLContainer"
    class="shadow-dom-component"
  ></div>
</template>

<script setup lang="ts">
  import shadowDomComposable, { shadowDomEmits, shadowDomProps } from '@/composables/elements/shadow-dom';

  const emits = defineEmits(shadowDomEmits);
  const props = defineProps(shadowDomProps);

  const { refHTMLContainer } = shadowDomComposable(emits, props);
</script>

<script lang="ts">
  // declare additional options
  export default {
    inheritAttrs: false,
  };
</script>

<style lang="scss" scoped></style>
