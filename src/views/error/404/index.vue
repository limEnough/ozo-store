<template>
  <section class="error error--404">
    <h2 class="blind">404 에러페이지</h2>

    <div class="error__wrapper">
      <p class="error__title">Page not found</p>

      <span class="error__text">
        페이지의 주소가 변경 혹은 삭제되어<br />
        요청하신 페이지를 찾을 수 없습니다.
      </span>

      <div class="error__button">
        <Button
          :to="{
            name: MAIN_PAGE_NAMES['main'],
          }"
          tag="router-link"
          case="normal"
          size="l"
        >
          홈으로
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import Button from '@/components/elements/button.vue';
  import { MAIN_PAGE_NAMES } from '@/constants/path-constants';
</script>

<style lang="scss" scoped>
  @import '@/styles/error/404/index.scss';
</style>
