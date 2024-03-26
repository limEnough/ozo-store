<template>
  <div class="mypage-menus">
    <!-- case. list -->
    <ul
      v-if="mypageMenus?.length"
      class="mypage-menus__list"
    >
      <template
        v-for="menu in mypageMenus"
        :key="`menu-${menu}`"
      >
        <li
          :class="getMenuClasses(menu.url)"
          class="list__menu"
        >
          <router-link
            :to="menu.url"
            class="list__menu__link"
          >
            <span class="list__menu__text">{{ menu.name }}</span>
          </router-link>
        </li>
      </template>

      <li class="list__menu logout">
        <Button
          case="text"
          @click.prevent="logout"
        >
          로그아웃
        </Button>
      </li>
    </ul>

    <!-- case. empty -->
    <Empty v-else></Empty>
  </div>
</template>

<script setup lang="ts">
  import mypageMenusComposable, { mypageMenusEmits, mypageMenusProps } from '@/composables/parts/mypage-menus';
  import Button from '@/components/elements/button.vue';
  import Empty from '@/components/elements/empty.vue';
  import useLogout from '@/composables/use/use-logout';

  const emits = defineEmits(mypageMenusEmits);
  const props = defineProps(mypageMenusProps);

  const { logout } = useLogout();

  const { mypageMenus, getMenuClasses } = mypageMenusComposable(emits, props);
</script>

<style lang="scss" scoped>
  @import '@/styles/components/parts/mypage-menus.scss';
</style>
