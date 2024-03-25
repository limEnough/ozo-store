<template>
  <component :is="DefaultLayout">
    <div class="mypage-main">
      <div class="mypage-main__top">
        <!-- 유저 TODO: 프로필 수정 페이지 링크 처리 -->
        <div class="mypage-main__top__user">
          <!-- 유저 프로필 -->
          <figure class="user__profile">
            <img
              src="../../../assets/images/member/image-profile-sample.png"
              alt="프로필 이미지"
              class="user__profile__image"
            />
          </figure>

          <!-- 유저 정보 -->
          <div class="user__info">
            <span class="user__info__name">{{ userInfo?.info?.name }}</span>
            <span class="user__info__email">{{ userInfo?.info?.email }}</span>
          </div>
        </div>

        <!-- 퀵 메뉴 TODO: 할까 말까 -->
        <!-- <ul class="mypage-main__top__quick">
          <li class="quick__menu">
            <router-link
              :to="{
                name: MAIN_PAGE_NAMES['main'],
              }"
              class="quick__menu__link"
            >
              <span class="quick__menu__number">14000</span>
              <span class="quick__menu__text">Point</span>
            </router-link>
          </li>

          <li class="quick__menu">
            <router-link
              :to="{
                name: MAIN_PAGE_NAMES['main'],
              }"
              class="quick__menu__link"
            >
              <span class="quick__menu__number">4</span>
              <span class="quick__menu__text">Order</span>
            </router-link>
          </li>
        </ul> -->
      </div>

      <div class="mypage-main__menu">
        <MypageMenus></MypageMenus>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
  import mypageMainComposable from '@/composables/views/mypage/main/index';
  import DefaultLayout from '@/components/layouts/default-layout.vue';
  import MypageMenus from '@/components/parts/mypage-menus.vue';

  const { userInfo } = mypageMainComposable();
</script>

<style lang="scss" scoped>
  @import '@/styles/mypage/main/index.scss';
</style>
