<template>
  <component :is="Single">
    <div class="login">
      <!-- 타이틀 영역 -->
      <div class="login__title">
        <h2 class="login__title__main">Welcome Back</h2>
        <span class="login__title__sub">sign to continue</span>
      </div>

      <!-- 로그인 폼 -->
      <form class="login__form">
        <Input
          v-model="userEmail"
          :use-length-count="false"
          label="Email"
          name="email"
          maxlength="30"
          is-card-type
        >
        </Input>

        <Input
          v-model="userPassword"
          :use-length-count="false"
          label="Password"
          type="password"
          name="password"
          visible
          is-card-type
        >
        </Input>

        <!-- TODO: 아이디 기억하기 체크박스 -->

        <Button
          width="full"
          size="l"
          class="login__form__button"
          >LOGIN</Button
        >
      </form>

      <!-- 로그인 옵션 -->
      <div class="login__option">
        <dl class="login__option__low">
          <dt class="login__option__title">Forgot account?</dt>
          <dd class="login__option__cont">
            <!-- <Link to="/">
              <span class="login__option__link">Email</span>
            </Link> -->
            <!-- <Link to="/">
              <span class="login__option__link">Password</span>
            </Link> -->
          </dd>
        </dl>

        <dl class="login__option__low">
          <dt class="login__option__title">Don't have account?</dt>
          <dd class="login__option__cont">
            <!-- <Link to="/">
              <span class="login__option__link">Create a new account</span>
            </Link> -->
          </dd>
        </dl>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
  import loginComposable from '@/composables/views/member/login';
  import Button from '@/components/elements/button.vue';
  import Input from '@/components/elements/input.vue';
  // import Link from '@/components/elements/link.vue';
  import Single from '@/components/layouts/single.vue';

  const { userEmail, userPassword } = loginComposable();
</script>

<style lang="scss" scoped>
  @import '@/styles/mobile/member/login.scss';
</style>
