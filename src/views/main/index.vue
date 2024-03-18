<template>
  <component
    :is="DefaultLayout"
    :is-loading="isLoading"
  >
    <div class="main">
      <!-- TODO: 검색 컴포넌트 -->

      <!-- visual 메인 슬라이드 -->
      <template v-if="visualUseYn && visualBanner?.length">
        <section class="main__visual main__section">
          <h3 class="main__title blind">상단 슬라이드</h3>

          <div class="main__visual__slider">
            <slider
              :slides="visualBanner"
              :autoplay="{ delay: 4000, disableOnInteraction: false }"
              :speed="500"
              :is-box-type="true"
              :use-caption="true"
            ></slider>
          </div>
        </section>
      </template>
    </div>
  </component>
</template>

<script setup lang="ts">
  import mainComposable from '@/composables/views/main';
  import DefaultLayout from '@/components/layouts/default-layout.vue';
  import slider from '@/components/elements/slider.vue';

  const { isLoading, visualUseYn, visualBanner } = mainComposable();
</script>

<style lang="scss" scoped>
  @import '@/styles/main/index.scss';
</style>
