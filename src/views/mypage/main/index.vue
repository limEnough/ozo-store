<template>
  <component :is="DefaultLayout">
    <div class="mypage-main">
      <div class="mypage-main__top">
        <div class="mypage-main__top__user">
          <!-- 유저 프로필 -->
          <!-- TODO: 이미지 URL 받아오기 -->
          <MypageProfile
            image-path=""
            class="user__profile"
          >
            <template #actions>
              <Link
                :to="{
                  name: MYPAGE_PAGE_NAMES['mypage-profile'],
                }"
                case="text"
                icon="edit"
                class="user__profile__edit"
                icon-only
              >
                <span>수정하기</span>
              </Link>
            </template>
          </MypageProfile>

          <!-- 유저 정보 -->
          <div class="user__info">
            <span class="user__info__name">{{ userInfo?.info?.name }}</span>
            <span class="user__info__email">{{ userInfo?.info?.email }}</span>
          </div>
        </div>

        <!-- TODO: 할까 말까 퀵 메뉴  -->
        <ul
          v-if="false"
          class="mypage-main__top__quick"
        >
          <li class="quick__menu">
            <router-link
              :to="{
                name: MYPAGE_PAGE_NAMES['mypage-benefit'],
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
                name: MYPAGE_PAGE_NAMES['mypage-order-history'],
              }"
              class="quick__menu__link"
            >
              <span class="quick__menu__number">4</span>
              <span class="quick__menu__text">Order</span>
            </router-link>
          </li>
        </ul>
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
  import MypageProfile from '@/components/parts/mypage-profile.vue';
  import Link from '@/components/elements/link.vue';
  import { MYPAGE_PAGE_NAMES } from '@/constants/path-constants';

  const { userInfo } = mypageMainComposable();
</script>

<style lang="scss" scoped>
  @import '@/styles/mypage/main/index.scss';
</style>
