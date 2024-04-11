<template>
  <component :is="DefaultLayout">
    <div class="goods-list">
      <template
        v-for="(goods, index) in sampleData"
        :key="`goods-${index}-${goods.goodsId}`"
      >
        <Goods :goods="goods"></Goods>
      </template>
    </div>
  </component>
</template>

<script setup lang="ts">
  import goodsListComposable from '@/composables/views/shop/goods-list/index';
  import DefaultLayout from '@/components/layouts/default-layout.vue';
  import Goods from '@/components/modules/goods.vue';

  const { sampleData } = goodsListComposable();
</script>

<style lang="scss" scoped>
  @import '@/styles/shop/goods-list/index.scss';
</style>
