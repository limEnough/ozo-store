<template>
  <template v-if="options">
    <div class="checkbox-group-component">
      <!-- [박스] 전체 선택 체크박스 -->
      <template v-if="useAllOption">
        <Checkbox
          v-model="isAllChecked"
          :name="`checkbox-all-${name}`"
          :value="value"
          :disabled="disabled || isAllDisabled"
          class="item-all box-type"
        >
          <slot name="all-label"> 전체 </slot>
        </Checkbox>
      </template>

      <!-- 개별 선택 체크박스 -->
      <template
        v-for="(option, index) in options"
        :key="`checkbox-${name}-${index}`"
      >
        <Checkbox
          v-model="model"
          :value="getValue(option)"
          :name="`checkbox-single-${name}-${uuid}`"
          :disabled="disabled || isDisabledOption(option)"
          :class="{ 'box-type': type === 'box' }"
        >
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
        </Checkbox>
      </template>

      <!-- 에러 메시지 -->
      <div
        v-if="errorMessage.length"
        class="checkbox-group-component__message"
      >
        <p class="message__text">
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
  import checkboxGroupComposable, {
    checkboxGroupEmits,
    checkboxGroupProps,
  } from '@/composables/modules/checkbox-group';
  import Checkbox from '@/components/elements/checkbox.vue';

  const emits = defineEmits(checkboxGroupEmits);
  const props = defineProps(checkboxGroupProps);

  const { slots, uuid, model, isAllChecked, isAllDisabled, isDisabledOption, isRequiredOption, getLabel, getValue } =
    checkboxGroupComposable(emits, props);
</script>

<style lang="scss" scoped>
  @import '@/styles/components/modules/checkbox-group.scss';
</style>
