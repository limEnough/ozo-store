<template>
  <component
    :is="DefaultLayout"
    :is-show-dockbar="false"
  >
    <div class="login">
      <!-- 로고 -->
      <figure class="login__logo">
        <img
          src="@/assets/images/common/image-logo.png"
          alt="OZO-store logo"
        />
      </figure>

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
          <CheckboxGroup
            v-model="useSaveEmail.value"
            :name="useSaveEmail.name"
            :options="loginOptions"
            label-key="codeName"
          >
          </CheckboxGroup>
        </div>

        <!-- 버튼 영역 -->
        <div class="login__actions">
          <!-- 계정 찾기 -->
          <Link
            :to="{
              name: MEMBER_PAGE_NAMES['member-search'],
              params: { type: 'email' },
            }"
            size="l"
            case="normal"
          >
            <span>Forgot account</span>
          </Link>

          <!-- 로그인 -->
          <Button
            type="submit"
            size="l"
            case="success"
            @click.prevent="handleSubmit"
          >
            <span>LOGIN</span>
          </Button>
        </div>
      </form>
    </div>
  </component>
</template>

<script setup lang="ts">
  import loginComposable from '@/composables/views/member/login';
  import Button from '@/components/elements/button.vue';
  import Input from '@/components/elements/input.vue';
  import CheckboxGroup from '@/components/elements/checkbox-group.vue';
  import Link from '@/components/elements/link.vue';
  import DefaultLayout from '@/components/layouts/default-layout.vue';
  import { MEMBER_PAGE_NAMES } from '@/constants/path-constants';

  const { loginOptions, email, password, useSaveEmail, handleSubmit } = loginComposable();
</script>

<style lang="scss" scoped>
  @import '@/styles/member/login/index.scss';
</style>
