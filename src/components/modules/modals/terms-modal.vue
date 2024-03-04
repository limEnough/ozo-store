<template>
  <div class="terms-modal-component">
    <Modal
      :title="termsModal.title"
      :size="termsModal.size"
      :scroll-lock="termsModal.scrollLock"
      :cancel="termsModal.cancel"
      is-open
      @close="emits('close')"
    >
      <ShadowDom :content-html="termsContents"></ShadowDom>
    </Modal>
  </div>
</template>

<script setup lang="ts">
  import termsModalComposable, { termsModalEmits, termsModalProps } from '@/composables/modules/modals/terms-modal';
  import ShadowDom from '@/components/elements/shadow-dom.vue';
  import Modal from '@/components/modules/modal.vue';

  const emits = defineEmits(termsModalEmits);
  const props = defineProps(termsModalProps);

  const { termsModal, termsContents } = termsModalComposable(emits, props);
</script>
