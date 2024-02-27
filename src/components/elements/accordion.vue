<template>
  <div
    :class="{ open: isOpen }"
    class="accordion-component"
    v-bind="styleAttrs"
  >
    <div
      class="accordion-component__inner"
      v-bind="accordionAttrs"
    >
      <!-- 헤더 영역 -->
      <div
        v-if="hasSlotHeader"
        :class="{ useHeaderToggle, hover: isHeaderHover }"
        ref="refAccordionHeader"
        class="accordion-component__header"
        @click="useHeaderToggle ? handleClick() : null"
      >
        <slot name="header"></slot>

        <!-- 토글 버튼 -->
        <button
          type="button"
          class="accordion-component__toggle"
          @click="useHeaderToggle ? null : handleClick()"
        >
          <span>접기/펼치기</span>
        </button>
      </div>

      <!-- 바디 영역 -->
      <template v-if="useTransition && false">
        <transition
          name="toggle-accordion"
          @before-enter="handleTransition.beforeEnter"
          @enter="handleTransition.enter"
          @after-enter="handleTransition.onAfterEnter"
          @before-leave="handleTransition.beforeLeave"
          @leave="handleTransition.leave"
        >
          <div
            v-show="isOpen"
            :class="{ overflow: useTransition }"
            class="accordion-component__body"
          >
            <slot name="body"></slot>
          </div>
        </transition>
      </template>
      <template v-else>
        <div
          v-show="isOpen"
          class="accordion-component__body"
        >
          <slot name="body"></slot>
        </div>
      </template>
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
  import accordionComposable, { accordionEmits, accordionProps } from '@/composables/elements/accordion';

  const emits = defineEmits(accordionEmits);
  const props = defineProps(accordionProps);

  const {
    refAccordionHeader,
    isOpen,
    isHeaderHover,
    styleAttrs,
    accordionAttrs,
    handleClick,
    handleTransition,
    hasSlotHeader,
  } = accordionComposable(emits, props);
</script>

<style lang="scss" scoped>
  @import '@/styles/components/elements/accordion';
</style>
