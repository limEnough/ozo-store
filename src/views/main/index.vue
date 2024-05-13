<template>
  <component
    :is="DefaultLayout"
    :is-loading="isLoading"
  >
    <div class="main">
      <Title :data="pageTitle"></Title>

      <!-- TODO: 검색 컴포넌트 -->
      <section class="main__search main__section">
        <SearchBar></SearchBar>
      </section>

      <!-- TODO: 구조 변경 및 항목 추가
        출처: https://www.pinterest.co.kr/pin/1147151336323139842/
        1. 프로모션
        2. 브랜드 리스트
        3. 베스트 상품
        4. 추천 상품
       -->

      <!-- 베스트 상품 -->
      <section
        v-if="bestGoodsUseYn"
        class="main__best main__section"
      >
        <h3 class="main__title blind">베스트 상품</h3>

        <Slider
          v-if="bestGoods && bestGoods?.length > 1"
          :slides="bestGoods"
          :autoplay="{ delay: 4000, disableOnInteraction: false }"
          :speed="500"
          :use-caption="true"
        >
          <template #slides>
            <swiper-slide
              v-for="(item, index) in bestGoods"
              :key="`goods-slide-${index}`"
              class="slider-component__item"
            >
              <Goods
                :goods="item"
                type="slide"
              ></Goods>
              <!-- @toggle-wish="" -->
            </swiper-slide>
          </template>
        </Slider>
      </section>
    </div>
  </component>
</template>

<script setup lang="ts">
  import { SwiperSlide } from 'swiper/vue';
  import mainComposable from '@/composables/views/main';
  import DefaultLayout from '@/components/layouts/default-layout.vue';
  import Slider from '@/components/elements/slider.vue';
  import Goods from '@/components/modules/goods.vue';
  import Title from '@/components/elements/title.vue';
  import SearchBar from '@/components/modules/search-bar.vue';

  const { pageTitle, isLoading, bestGoodsUseYn, bestGoods } = mainComposable();
</script>

<style lang="scss" scoped>
  @import '@/styles/main/index.scss';
</style>
