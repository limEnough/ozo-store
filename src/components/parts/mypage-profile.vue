<template>
  <div class="mypage-profile">
    <!-- 프로필 썸네일 -->
    <figure class="mypage-profile__thumb">
      <img
        :src="imagePath"
        alt="프로필 이미지"
        class="mypage-profile__image"
      />

      <button
        type="button"
        class="mypage-profile__popup"
        @click="handleOpenPreviewModal"
      >
        이미지 미리보기 팝업 열기
      </button>
    </figure>

    <!-- actions slot -->
    <slot name="actions"> </slot>

    <!-- 이미지 미리보기 팝업 -->
    <PreviewModal
      v-if="isOpenPreviewModal"
      :image-path-data="imagePathData"
      @close="closePreviewModal"
    ></PreviewModal>
  </div>
</template>

<script setup lang="ts">
  import mypageProfileComposable, { mypageProfileEmits, mypageProfileProps } from '@/composables/parts/mypage-profile';
  import PreviewModal from '@/components/modules/modals/preview-modal.vue';

  const emits = defineEmits(mypageProfileEmits);
  const props = defineProps(mypageProfileProps);

  const { handleOpenPreviewModal, isOpenPreviewModal, closePreviewModal, imagePathData } = mypageProfileComposable(
    emits,
    props,
  );
</script>

<style lang="scss" scoped>
  @import '@/styles/components/parts/mypage-profile.scss';
</style>
