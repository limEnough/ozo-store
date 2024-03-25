<template>
  <section class="error error--500">
    <h2 class="blind">500 에러페이지</h2>

    <div class="error__wrapper">
      <p class="error__title">
        We have<br />
        an internal server error
      </p>

      <span class="error__text">
        일시적인 오류가 발생했습니다.<br />
        잠시 후 다시 접속해 주세요.
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
