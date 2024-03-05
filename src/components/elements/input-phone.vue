<template>
  <div
    class="input-phone-component"
    v-bind="styleAttrs"
  >
    <!-- 입력 영역 -->
    <div class="input-phone-component__inner">
      <InputNumber
        v-model="frontNumber"
        v-bind="functionalAttrs"
        :min-length="2"
        :max-length="4"
        :use-length-count="false"
        :use-comma="false"
        :disabled="disabled"
        error-message=""
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
        error-message=""
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
        error-message=""
        name="endNumber"
        class="input-phone-component__input"
        type="text"
        use-zero
      ></InputNumber>
    </div>

    <!-- 에러 메시지 -->
    <div
      v-if="errorMessage.length"
      class="input-phone-component__message"
    >
      <p class="message__text">
        {{ errorMessage }}
      </p>
    </div>
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
