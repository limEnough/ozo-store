<template>
  <!-- TODO: 아코디언 컴포넌트@!!!!!!!!!!!!!!!!!!!!!!! -->
  <div
    :class="{
      'form-group-component--required': required,
      'form-group-component--has-depth': hasDepth,
      'form-group-component--inner-group': isInnerGroup,
    }"
    class="form-group-component"
  >
    <!-- 아코디언 사용할 경우 -->
    <template v-if="useAccordion && hasSlotHeader">
      <fb-accordion
        :is-open="isOpen"
        class="form-group-component__accordion"
        @toggle="handleToggle"
      >
        <!-- 타이틀 영역 -->
        <template
          v-if="hasSlotHeader || useTitle"
          #header
        >
          <span class="form-group-component__title">
            <slot name="title">
              {{ title }}
            </slot>
          </span>
        </template>

        <template #body>
          <!-- 콘텐츠 영역 -->
          <div class="form-group-component__contents">
            <slot name="contents"></slot>
          </div>

          <!-- 가이드문구 영역 -->
          <div
            v-if="hasSlotGuide"
            class="form-group-component__guide"
          >
            <slot name="guide"></slot>
          </div>
        </template>
      </fb-accordion>
    </template>

    <!-- 아코디언 사용하지 않을 경우 -->
    <template v-else>
      <!-- 타이틀 영역 -->
      <template v-if="useTitle || hasSlotHeader">
        <span class="form-group-component__title">
          <slot name="title">
            {{ title }}
          </slot>
        </span>
      </template>

      <!-- 콘텐츠 영역 -->
      <div class="form-group-component__contents">
        <slot name="contents"></slot>
      </div>

      <!-- 가이드 문구 영역 -->
      <div
        v-if="hasSlotGuide"
        class="form-group-component__guide"
      >
        <slot name="guide"></slot>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import formGroupComposable from '@/composables/modules/form-group';

  const { hasSlotHeader, hasSlotGuide, handleToggle } = formGroupComposable();
</script>

<style lang="scss" scoped>
  @import '@/styles/components/modules/form-group.scss';
</style>
