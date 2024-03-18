<template>
  <component
    :is="DefaultLayout"
    :is-show-dockbar="false"
  >
    <div class="login">
      <!-- 타이틀 영역 -->
      <Title :data="pageTitle"></Title>

      <!-- 로그인 폼 -->
      <form class="login__form">
        <!-- 이메일 -->
        <Input
          v-model="email.value"
          :name="email.name"
          :use-length-count="false"
          :maxlength="email.max"
          :allowed-regex="email.regex"
          placeholder="이메일을 입력해주세요."
          is-card-type
        >
        </Input>

        <!-- 비밀번호 -->
        <Input
          v-model="password.value"
          :name="password.name"
          :use-length-count="false"
          :maxlength="password.max"
          :allowed-regex="password.regex"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          visible
          is-card-type
        >
        </Input>

        <!-- 로그인 옵션 -->
        <div class="login__option">
          <Checkbox
            v-model="useSaveEmail.value"
            :name="useSaveEmail.name"
            :options="loginOptions"
            label-key="codeName"
          >
          </Checkbox>
        </div>

        <!-- 로그인 버튼 -->
        <Button
          width="full"
          type="submit"
          size="l"
          case="success"
          class="login__form__button"
          @click.prevent="handleSubmit"
        >
          <span>LOGIN</span>
        </Button>
      </form>

      <!-- 로그인 옵션 -->
      <div class="login__search">
        <dl class="login__search__low">
          <dt class="login__search__title">Forgot account?</dt>
          <dd class="login__search__cont">
            <Link
              :to="{
                name: MEMBER_PAGE_NAMES['member-search'],
                params: { type: 'email' },
              }"
              case="text"
            >
              <span>Email</span>
            </Link>
            <Link
              :to="{
                name: MEMBER_PAGE_NAMES['member-search'],
                params: { type: 'password' },
              }"
              case="text"
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
  import Checkbox from '@/components/elements/checkbox.vue';
  import Link from '@/components/elements/link.vue';
  import DefaultLayout from '@/components/layouts/default-layout.vue';
  import { MEMBER_PAGE_NAMES } from '@/constants/path-constants';

  const { pageTitle, loginOptions, email, password, useSaveEmail, handleSubmit } = loginComposable();
</script>

<style lang="scss" scoped>
  @import '@/styles/member/login/index.scss';
</style>
