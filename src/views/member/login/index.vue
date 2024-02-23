<template>
  <component :is="DefaultLayout">
    <div class="login">
      <!-- 타이틀 영역 -->
      <Title :data="pageTitle"></Title>

      <!-- 로그인 폼 -->
      <form class="login__form">
        <Input
          v-model="userEmail"
          :use-length-count="false"
          placeholder="Email"
          name="email"
          maxlength="30"
          is-card-type
        >
        </Input>

        <Input
          v-model="userPassword"
          :use-length-count="false"
          placeholder="password"
          name="password"
          visible
          is-card-type
        >
        </Input>

        <!-- TODO: 아이디 기억하기 체크박스 -->

        <Button
          width="full"
          size="l"
          case="success"
          class="login__form__button"
        >
          <span>LOGIN</span>
        </Button>
      </form>

      <!-- 로그인 옵션 -->
      <div class="login__option">
        <dl class="login__option__low">
          <dt class="login__option__title">Forgot account?</dt>
          <dd class="login__option__cont">
            <Link
              :to="{
                name: MEMBER_PAGE_NAMES['member-search'],
                params: { type: 'email' },
              }"
            >
              <span>Email</span>
            </Link>
            <Link
              :to="{
                name: MEMBER_PAGE_NAMES['member-search'],
                params: { type: 'password' },
              }"
            >
              <span>Password</span>
            </Link>
          </dd>
        </dl>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
  import loginComposable from '@/composables/views/member/login';
  import Title from '@/components/elements/title.vue';
  import Button from '@/components/elements/button.vue';
  import Input from '@/components/elements/input.vue';
  import Link from '@/components/elements/link.vue';
  import DefaultLayout from '@/components/layouts/default-layout.vue';
  import { MEMBER_PAGE_NAMES } from '@/constants/path-constants';

  const { userEmail, userPassword, pageTitle } = loginComposable();
</script>

<style lang="scss" scoped>
  @import '@/styles/member/login.scss';
</style>
