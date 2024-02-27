<template>
  <div
    class="input-number-component"
    v-bind="styleAttrs"
  >
    <Input
      v-bind="inputNumberAttrs"
      :model-value="displayNumber"
      :use-length-count="useLengthCount"
      :minlength="minLength"
      :maxlength="maxLength"
      :name="name"
      :disabled="disabled"
      :is-error="isError"
      :error-message="errorMessage"
      type="text"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </div>
</template>

<script lang="ts">
  // declare additional options
  export default {
    inheritAttrs: false,
  };
</script>

<script setup lang="ts">
  import Input from '@/components/elements/input.vue';
  import inputNumberComposable, { InputNumberEmits, InputNumberProps } from '@/composables/elements/input-number';

  const emits = defineEmits(InputNumberEmits);
  const props = defineProps(InputNumberProps);

  const { displayNumber, styleAttrs, inputNumberAttrs, handleInput, handleFocus, handleBlur } = inputNumberComposable(
    emits,
    props,
  );
</script>

<style lang="scss" scoped>
  @import '@/styles/components/elements/input-number.scss';
</style>
