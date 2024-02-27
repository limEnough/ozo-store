<template>
  <div
    class="input-phone-component"
    v-bind="styleAttrs"
  >
    <InputNumber
      v-model="frontNumber"
      v-bind="functionalAttrs"
      :min-length="2"
      :max-length="4"
      :use-length-count="false"
      :use-comma="false"
      :disabled="disabled"
      name="frontNumber"
      class="input-phone-component__input"
      type="text"
      use-zero
    ></InputNumber>

    <span class="input-phone-component__split">-</span>

    <InputNumber
      v-model="middleNumber"
      v-bind="functionalAttrs"
      :min-length="3"
      :max-length="4"
      :use-length-count="false"
      :use-comma="false"
      :disabled="disabled"
      name="middleNumber"
      class="input-phone-component__input"
      type="text"
      use-zero
    ></InputNumber>

    <span class="input-phone-component__split">-</span>

    <InputNumber
      v-model="endNumber"
      v-bind="functionalAttrs"
      :max-length="4"
      :use-length-count="false"
      :use-comma="false"
      :disabled="disabled"
      name="endNumber"
      class="input-phone-component__input"
      type="text"
      use-zero
    ></InputNumber>
  </div>
</template>

<script lang="ts">
  // declare additional options
  export default {
    inheritAttrs: false,
  };
</script>

<script setup lang="ts">
  import InputPhoneComposable, { InputPhoneEmits, InputPhoneProps } from '@/composables/elements/input-phone';
  import InputNumber from '@/components/elements/input-number.vue';

  const emits = defineEmits(InputPhoneEmits);
  const props = defineProps(InputPhoneProps);

  const { frontNumber, middleNumber, endNumber, styleAttrs, functionalAttrs } = InputPhoneComposable(emits, props);
</script>

<style lang="scss" scoped>
  @import '@/styles/components/elements/input-phone.scss';
</style>
