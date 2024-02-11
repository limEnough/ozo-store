<template>
  <div
    :class="{
      'form-item-component--required': required,
      'form-item-component--sub': useSubContents,
    }"
    class="form-item-component"
  >
    <!-- 타이틀 영역 -->
    <label class="form-item-component__title">
      <span class="title__text">
        <slot name="title">
          {{ title }}
        </slot>
      </span>
    </label>

    <!-- 콘텐츠 영역 -->
    <div class="form-item-component__contents">
      <!-- 메인 콘텐츠 -->
      <div class="contents">
        <slot name="contents"></slot>
      </div>

      <!-- 서브 콘텐츠 -->
      <div
        v-if="slots['contents-sub']"
        class="contents"
      >
        <slot name="contents-sub"></slot>
      </div>

      <!-- 메시지 영역 -->
      <div
        v-if="slots.messages"
        class="form-item-component__messages"
      >
        <slot name="messages"></slot>
      </div>

      <!-- 가이드 영역 -->
      <div
        v-if="slots.guides"
        class="form-item-component__guide"
      >
        <slot name="guides"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import formItemComposable, { formItemEmits, formItemProps } from '@/composables/modules/form-item';

  defineEmits(formItemEmits);
  defineProps(formItemProps);

  const { slots } = formItemComposable();
</script>

<style lang="scss" scoped>
  @import '@/styles/components/modules/form-item.scss';
</style>
