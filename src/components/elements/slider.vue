<template>
  <Swiper
    :class="{
      ['box-type']: isBoxType,
    }"
    :initial-slide="initialSlide"
    :modules="modules"
    :loop="slides.length > minimum"
    :navigation="false"
    :pagination="{
      type: usePagination ? 'bullets' : undefined,
    }"
    ref="refSlider"
    class="slider-component"
    slides-per-view="auto"
    auto-height
    v-bind="$attrs"
    @init="$emit('init', $event)"
    @slide-change="$emit('slide-change', $event)"
    @touch-start="$emit('touch-start', $event)"
    @touch-move="$emit('touch-move', $event)"
    @touch-end="$emit('touch-end', $event)"
  >
    <slot name="slides">
      <template
        v-for="(item, index) in slides"
        :key="`slider${index}`"
      >
        <!-- 슬라이드 -->
        <swiper-slide class="slider-component__item swiper-slide">
          <component
            :is="item.externalLink ? 'a' : item.link ? 'router-link' : 'div'"
            :to="item.externalLink ? false : item.link ?? '#'"
            :href="item.externalLink"
            :target="item.externalLink ? '_blank' : false"
            class="slider-component__link"
          >
            <figure class="slider-component__image">
              <img
                :src="item.imageUrl ?? item.imagePath"
                alt="slideImage"
              />
            </figure>
          </component>
        </swiper-slide>
      </template>
    </slot>
  </Swiper>
</template>

<script setup lang="ts">
  import 'swiper/css';
  import 'swiper/css/autoplay';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import sliderComposable, { sliderEmits, sliderProps } from '@/composables/elements/slider';

  const emits = defineEmits(sliderEmits);
  const props = defineProps(sliderProps);

  const {
    //swiper
    modules,

    //exposes
    exposes,
  } = sliderComposable(emits, props);

  defineExpose(exposes);
</script>

<style lang="scss" scoped>
  @import '@/styles/components/elements/slider.scss';
</style>
