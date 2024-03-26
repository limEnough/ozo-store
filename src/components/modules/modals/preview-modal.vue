<template>
  <div class="preview-modal-component">
    <Modal
      :title="previewModal.title"
      :size="previewModal.size"
      :scroll-lock="previewModal.scrollLock"
      :cancel="previewModal.cancel"
      :close-on-click-outside="false"
      hide-footer
      show-close
      hide-title
      is-open
      @close="emits('close')"
    >
      <div class="preview-modal-component__contents">
        <Slider :slides="imagePathData"></Slider>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
  import previewModalComposable, {
    previewModalEmits,
    previewModalProps,
  } from '@/composables/modules/modals/preview-modal';
  import Modal from '@/components/modules/modal.vue';
  import Slider from '@/components/elements/slider.vue';

  const emits = defineEmits(previewModalEmits);
  const props = defineProps(previewModalProps);

  const { previewModal } = previewModalComposable(emits, props);
</script>

<style lang="scss" scoped>
  @import '@/styles/components/modules/modals/preview-modal.scss';
</style>
