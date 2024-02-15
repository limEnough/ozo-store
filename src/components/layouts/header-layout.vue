<template>
  <div class="header-layout">
    <!-- 왼쪽 영역 -->
    <div class="header-layout__left">
      <!-- 뒤로가기 -->
      <Button
        icon="back"
        class="header-layout__back"
        icon-only
        @click.stop="$router.back()"
      >
        <span>뒤로가기</span>
      </Button>

      <!-- 타이틀 -->
      <h1
        v-if="usingTitle"
        class="header-layout__title"
      >
        {{ pageTitle }}
      </h1>
    </div>

    <!-- 오른쪽 영역 -->
    <div class="header-layout__right">
      <slot>
        <template v-if="isLoginPage">
          <div>
            <Link
              :to="{
                name: MEMBER_PAGE_NAMES['member-create'],
              }"
              case="normal"
              icon="add"
            >
              <span>Create</span>
            </Link>
          </div>
        </template>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import HeaderLayoutComposable, { headerLayoutProps } from '@/composables/layouts/header-layout';
  import { MEMBER_PAGE_NAMES } from '@/constants/path-constants';
  import Button from '@/components/elements/button.vue';
  import Link from '@/components/elements/link.vue';

  const props = defineProps(headerLayoutProps);

  const { pageTitle, isLoginPage } = HeaderLayoutComposable(props);
</script>

<style lang="scss" scoped>
  @import '@/styles/components/layouts/header-layout.scss';
</style>
