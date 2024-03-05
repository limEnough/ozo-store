<template v-if="rows?.length">
  <select
    v-model="model"
    v-bind="attrs"
    :disabled="readonly"
    :class="{
      [`size--${size}`]: !!size,
      error: isError,
    }"
    class="select-component"
  >
    <slot name="options">
      <template
        v-for="(item, index) in rows"
        :key="`select-${index}`"
      >
        <slot
          :row="item"
          name="option"
        >
          <option
            v-bind="attrs"
            :value="item"
            :disabled="item?.disabled ?? false"
            :class="{ placeholder: item?.isPlaceholder ?? false }"
          >
            <slot
              :row="item"
              name="option-text"
            >
              <!-- disabled 앞에 붙는 텍스트 -->
              <template v-if="!hideDisabledText && item?.disabled && item?.code">
                <slot name="option-disabled-text"> [품절] </slot>
              </template>

              {{ item?.codeName }}
            </slot>
          </option>
        </slot>
      </template>
    </slot>
  </select>

  <!-- 에러 메시지 -->
  <div
    v-if="errorMessage.length"
    class="input-component__message"
  >
    <p class="message__text">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script lang="ts">
  // declare additional options
  export default {
    inheritAttrs: false,
  };
</script>

<script setup lang="ts">
  import selectboxComposable, { selectboxEmits, selectboxProps } from '@/composables/elements/selectbox';

  const emits = defineEmits(selectboxEmits);
  const props = defineProps(selectboxProps);

  const { model, attrs } = selectboxComposable(emits, props);
</script>

<style lang="scss" scoped>
  @import '@/styles/components/elements/selectbox.scss';
</style>
