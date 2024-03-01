<template>
  <div
    :class="{
      error: isError,
      'search-mode': isSearch,
      required: required,
      clearable: clearable,
      visible: visible,
      'card-type': isCardType,
      focused: isFocus && isCardType,
    }"
    class="input-component"
    v-bind="styleAttrs"
  >
    <!-- 라벨 박스 -->
    <div class="input-component__top">
      <!-- 1. 라벨 -->
      <label
        v-if="hasLabel"
        :for="`input-${name}`"
        class="input-component__top__label"
      >
        <slot name="title"></slot>
      </label>

      <!-- 2. 글자수 카운터 -->
      <template v-if="useLengthCount && maxlength && !disabled">
        <!-- TODO: 카운트 컴포넌트 -->
        <div class="input-component__top__count">0/0</div>
      </template>
    </div>

    <!-- 인풋 박스 -->
    <div class="input-component__bottom">
      <!-- 1. 인풋 -->
      <input
        v-bind="inputBindings"
        :value="inputValue"
        :disabled="disabled"
        :aria-label="$attrs.placeholder?.toString()"
        :type="controlType"
        ref="inputElement"
        :id="`input-${name}`"
        class="input-component__bottom__input"
        @input="handleInput"
        @focus="(isFocus = true), handleFocus()"
        @blur="handleBlur()"
      />

      <!-- 2. 우측 버튼 영역 -->
      <div class="input-component__bottom__button">
        <slot name="button">
          <!-- clear 버튼 -->
          <Button
            v-show="clearable && 0 < modelValueTextLength"
            icon="clear"
            icon-only
            @click.stop="handleInputClear()"
          >
            <span class="blind">삭제</span>
          </Button>

          <!-- 비밀번호 보기 버튼 -->
          <Button
            v-if="inputType === 'password' && visible && (inputValue?.toString() as string).length"
            :class="{
              show: controlType !== inputType,
            }"
            icon="visible"
            icon-only
            @click.stop="handleInputVisible()"
          >
            <span class="blind">비밀번호 보기</span>
          </Button>

          <!-- 검색 버튼 -->
          <Button
            v-if="isSearch"
            type="button"
            icon="search"
            class="button__search"
            icon-only
            @click.stop="handleSearch(($event.target as HTMLInputElement).value)"
          >
            <span class="blind">검색</span>
          </Button>
        </slot>
      </div>
    </div>

    <!-- 에러 메시지 -->
    <div
      v-if="errorMessage.length"
      class="input-component__message"
    >
      <p class="message__text">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import inputComposable, { inputEmits, inputProps } from '@/composables/elements/input';
  import Button from '@/components/elements/button.vue';

  const emit = defineEmits(inputEmits);
  const props = defineProps(inputProps);

  const {
    styleAttrs,
    inputBindings,
    isFocus,

    inputElement,

    modelValueTextLength,

    handleInputClear,
    handleSearch,
    handleInputVisible,
    handleFocus,
    handleBlur,

    // field
    inputValue,
    handleInput,
    inputType,
    controlType,
  } = inputComposable(emit, props);
</script>

<style lang="scss" scoped>
  @import '@/styles/components/elements/input.scss';
</style>
