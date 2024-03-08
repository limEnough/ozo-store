<template>
  <template v-if="options">
    <div class="checkbox-component">
      <!-- [박스] 전체 선택 체크박스 -->
      <template v-if="useAllOption">
        <label
          class="checkbox-component__item checkbox-component__item--all box-type"
          v-bind="styleAttrs"
        >
          <input
            v-model="isAllChecked"
            :name="`checkbox-all-${name}`"
            :value="value"
            :disabled="disabled || isAllDisabled"
            type="checkbox"
            class="checkbox-component__input blind"
            v-bind="functionalAttrs"
          />

          <span class="checkbox-component__label">
            <slot name="all-label"> 전체 </slot>
          </span>
        </label>
      </template>

      <!-- 개별 선택 체크박스 -->
      <template
        v-for="(option, index) in options"
        :key="`checkbox-${name}-${index}`"
      >
        <label
          :class="{ 'box-type': type === 'box' }"
          class="checkbox-component__item"
          v-bind="styleAttrs"
        >
          <input
            v-model="model"
            :value="getValue(option)"
            :name="`checkbox-single-${name}-${uuid}`"
            :disabled="disabled || isDisabledOption(option)"
            type="checkbox"
            class="checkbox-component__input blind"
            v-bind="functionalAttrs"
          />

          <span class="checkbox-component__label">
            <slot
              :label="getLabel(option)"
              :option="option"
              name="label"
            >
              <!-- 라벨 앞에 붙는 텍스트 -->
              <template v-if="useFrontLabelText">
                <template v-if="isRequiredOption(option)">
                  <slot name="option-front-text"> [필수] </slot>
                </template>

                <template v-else>
                  <slot name="option-front-text"> [선택] </slot>
                </template>
              </template>

              {{ getLabel(option) }}

              <!-- 라벨 뒤에 붙는 텍스트 -->
              <template v-if="slots['option-back-text']">
                <slot
                  :option="option"
                  name="option-back-text"
                ></slot>
              </template>
            </slot>
          </span>
        </label>
      </template>

      <!-- 에러 메시지 -->
      <div
        v-if="errorMessage.length"
        class="checkbox-component__message"
      >
        <p class="message__text">
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </template>
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

  const {
    slots,
    uuid,
    model,
    isAllChecked,
    isAllDisabled,
    isDisabledOption,
    isRequiredOption,
    getLabel,
    getValue,
    styleAttrs,
    functionalAttrs,
  } = checkboxComposable(emits, props);
</script>

<style lang="scss" scoped>
  @import '@/styles/components/elements/checkbox.scss';
</style>
