<template>
  <div
    class="form-layout"
    v-bind="$attrs"
  >
    <!-- 타이틀 영역 -->
    <Title></Title>

    <!-- 아코디언 토글 영역 -->
    <div class="form-layout__toggle">
      <div class="form-layout__toggle--wrap">
        <slot name="toggle"></slot>
      </div>
    </div>

    <!-- 콘텐츠 영역 -->
    <section class="form-layout__contents">
      <div class="contents">
        <slot></slot>
      </div>
    </section>

    <!-- 하단 영역 -->
    <div
      v-if="isVisibleFooter"
      class="form-layout__footer"
    >
      <nav class="form-layout__actions">
        <slot name="actions">
          <Button
            v-if="props.onCancel"
            :disabled="cancelOption.disabled"
            type="button"
            size="l"
            case="normal"
            @click="emits('cancel')"
          >
            <span>{{ cancelOption.title }}</span>
          </Button>

          <Button
            v-if="props.onSubmit"
            :disabled="submitOption.disabled"
            type="button"
            size="l"
            case="success"
            @click="emits('submit')"
          >
            <span>{{ submitOption.title }}</span>
          </Button>
        </slot>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
  import formLayoutComposable, { formLayoutEmits, formLayoutProps } from '@/composables/layouts/form-layout';
  import Button from '@/components/elements/button.vue';
  import Title from '@/components/elements/title.vue';

  const emits = defineEmits(formLayoutEmits);
  const props = defineProps(formLayoutProps);

  const { pageTitle, cancelOption, submitOption, isVisibleFooter } = formLayoutComposable(emits, props);
</script>

<script lang="ts">
  export default {
    inheritAttrs: false,
  };
</script>

<style lang="scss" scoped>
  @import '@/styles/components/layouts/form-layout.scss';
</style>
