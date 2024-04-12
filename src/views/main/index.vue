<template>
  <component
    :is="DefaultLayout"
    :is-loading="isLoading"
  >
    <div class="main">
      <!-- TODO: 검색 컴포넌트 -->

      <!-- 베스트 상품 -->
      <section class="main__best main__section">
        <h3 class="main__title blind">베스트 상품</h3>

        <Slider
          v-if="bestGoods?.length >= 2"
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

  const { isLoading, visualUseYn, visualBanner, bestGoods } = mainComposable();
</script>

<style lang="scss" scoped>
  @import '@/styles/main/index.scss';
</style>
