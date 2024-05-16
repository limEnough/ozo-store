<template>
  <component :is="DefaultLayout">
    <div class="wish">
      <template
        v-for="(goods, index) in goodsList"
        :key="`goods-${index}-${goods.goodsId}`"
      >
        <Goods
          :goods="goods"
          type="list"
        ></Goods>
      </template>
    </div>
  </component>
</template>

<script setup lang="ts">
  import wishComposable from '@/composables/views/mypage/wish/index';
  import DefaultLayout from '@/components/layouts/default-layout.vue';
  import Goods from '@/components/modules/goods.vue';

  const { goodsList } = wishComposable();
</script>

<style lang="scss" scoped>
  @import '@/styles/mypage/wish.scss';
</style>
