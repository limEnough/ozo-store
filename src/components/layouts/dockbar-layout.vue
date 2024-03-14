<template>
  <nav
    v-show="false === isScrollDown"
    class="dockbar-layout"
  >
    <div class="dockbar-layout__inner">
      <Button
        class="dockbar-layout__menu category"
        icon-only
        @click="handleDrawerOpen()"
      >
        <span>카테고리</span>
      </Button>

      <!-- <Drawer ref="refDrawerModal"> </Drawer> -->

      <Link
        :to="{
          name: MAIN_PAGE_NAMES['main'],
        }"
        :class="{ active: currentRouteName === MAIN_PAGE_NAMES['main'] }"
        class="dockbar-layout__menu home"
        icon-only
      >
        <span>홈</span>
      </Link>

      <Link
        :to="{
          name: MYPAGE_PAGE_NAMES['mypage-wish'],
        }"
        :class="{ active: currentRouteName === MYPAGE_PAGE_NAMES['mypage-wish'] }"
        class="dockbar-layout__menu wish"
        icon-only
      >
        <span>찜</span>
      </Link>

      <Link
        :to="{
          name: MYPAGE_PAGE_NAMES['mypage-main'],
        }"
        :class="{ active: currentRouteName === MYPAGE_PAGE_NAMES['mypage-main'] }"
        class="dockbar-layout__menu mypage"
        icon-only
      >
        <span>마이페이지</span>
      </Link>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import dockbarLayoutComposable, {
    dockbarLayoutProps,
    dockbarLayoutEmits,
  } from '@/composables/layouts/dockbar-layout';
  import Button from '@/components/elements/button.vue';
  import Link from '@/components/elements/link.vue';
  import { MYPAGE_PAGE_NAMES, MAIN_PAGE_NAMES } from '@/constants/path-constants';

  const props = defineProps(dockbarLayoutProps);
  const emits = defineEmits(dockbarLayoutEmits);

  const { refDrawerModal, handleDrawerOpen, currentRouteName } = dockbarLayoutComposable(emits, props);
</script>

<style lang="scss" scoped>
  @import '@/styles/components/layouts/dockbar-layout.scss';
</style>
