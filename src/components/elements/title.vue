<template>
  <div class="title-component">
    <!-- 메인 타이틀 -->
    <h2 class="title-component__main">{{ titleInfo.main }}</h2>
    <!-- 서브 타이틀 -->
    <span
      v-if="hasSubTitle"
      class="title-component__sub"
      >{{ titleInfo.sub }}</span
    >
  </div>
</template>

<script setup lang="ts">
  import titleComposables, { titleProps } from '@/composables/elements/title';

  const props = defineProps(titleProps);

  const { titleInfo, hasSubTitle } = titleComposables(props);
</script>

<style lang="scss" scoped>
  @import '@/styles/components/elements/title.scss';
</style>
