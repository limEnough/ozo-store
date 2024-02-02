<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="buttonClasses"
    class="button-component"
  >
    <span
      :class="[
        {
          [`icon--${props.icon}`]: props.icon, // icon
          loading: props.loading, // loading
        },
      ]"
      class="button-component__text"
    >
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
  import buttonComposables, { buttonProps } from '@/composables/elements/button';

  const props = defineProps(buttonProps);

  const { buttonClasses } = buttonComposables(props);
</script>

<style lang="scss" scoped>
  @import '@/styles/components/elements/button.scss';
</style>
