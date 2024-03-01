<template>
  <div class="title-component">
    <!-- 메인 타이틀 -->
    <h2 class="title-component__main">
      <slot name="title">
        {{ titleInfo.main }}
      </slot>
    </h2>

    <!-- 서브 타이틀 -->
    <span
      v-if="hasSubTitle"
      class="title-component__sub"
    >
      <slot name="sub-title">
        {{ titleInfo.sub }}
      </slot>
    </span>
  </div>
</template>

<script setup lang="ts">
  import titleComposable, { titleProps } from '@/composables/elements/title';

  const props = defineProps(titleProps);

  const { titleInfo, hasSubTitle } = titleComposable(props);
</script>

<style lang="scss" scoped>
  @import '@/styles/components/elements/title.scss';
</style>
