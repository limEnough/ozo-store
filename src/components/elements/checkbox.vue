<template>
  <div
    :class="{ ['icon-only']: iconOnly }"
    class="checkbox-component"
  >
    <label
      v-bind="styleAttrs"
      class="checkbox-component__item"
    >
      <input
        v-model="model"
        :name="name"
        :value="value"
        :disabled="disabled"
        type="checkbox"
        class="checkbox-component__input blind"
        v-bind="functionalAttrs"
      />

      <span class="checkbox-component__label">
        <slot></slot>
      </span>
    </label>
  </div>
</template>

<script lang="ts">
  // declare additional options
  export default {
    inheritAttrs: false,
  };
</script>

<script setup lang="ts">
  import checkboxComposable, { checkboxEmits, checkboxProps } from '@/composables/elements/checkbox';

  const emits = defineEmits(checkboxEmits);
  const props = defineProps(checkboxProps);

  const { styleAttrs, functionalAttrs, model } = checkboxComposable(emits, props);
</script>

<style lang="scss" scoped>
  @import '@/styles/components/elements/checkbox.scss';
</style>
