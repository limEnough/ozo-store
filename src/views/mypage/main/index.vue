<template>
  <component :is="DefaultLayout">
    <div class="mypageMain">
      <!-- TODO: 파일 업로드 컴포넌트 -->
      <figure class="profile">
        <img
          src="../../../assets/images/member/image-profile-sample.png"
          alt="프로필 이미지"
          class="profile__image"
        />
      </figure>
    </div>
  </component>
</template>

<script setup lang="ts">
  // import mypageMainComposable from '@/composables/src/views/mypage/main/index';
  import DefaultLayout from '@/components/layouts/default-layout.vue';

  // const {} = mypageMainComposable();
</script>

<style lang="scss" scoped>
  @import '@/styles/mypage/main/index.scss';
</style>
