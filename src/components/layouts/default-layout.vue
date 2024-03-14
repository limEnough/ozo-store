<template>
  <div class="default-layout">
    <!-- 헤더 -->
    <HeaderLayout
      :is-login-header="isLoginPage"
      :is-main-page="isMainPage"
    >
    </HeaderLayout>

    <div class="default-layout__container">
      <!-- 콘텐츠 -->
      <main class="default-layout__inner">
        <!-- 콘텐츠 -->
        <slot></slot>
      </main>

      <!-- TODO: 독바 -->
      <!-- :is-scroll-down="scrollModel.isDown" -->
      <Dockbar
        v-if="isShowDockbar"
        class="default-layout__dockbar"
      ></Dockbar>

      <!-- TODO: 푸터 -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import defaultLayoutComposable, { defaultLayoutProps } from '@/composables/layouts/default-layout';
  import HeaderLayout from '@/components/layouts/header-layout.vue';
  import Dockbar from '@/components/layouts/dockbar-layout.vue';

  const props = defineProps(defaultLayoutProps);

  const { isLoginPage, isMainPage } = defaultLayoutComposable(props);
</script>

<style lang="scss" scoped>
  @import '@/styles/components/layouts/default-layout.scss';
</style>
