<template>
  <Teleport :to="TELEPORT_TARGET">
    <div
      v-if="isOpen"
      :aria-hidden="!isOpen ? 'true' : 'false'"
      v-bind="attrs"
      :class="{
        'size--s': size === 's',
        'size--m': size === 'm',
        'size--l': size === 'l',
      }"
      class="modal-component"
      role="dialog"
    >
      <!-- Modal contents -->
      <div
        ref="modalContentRef"
        class="modal-component__contents"
      >
        <!-- Modal header -->
        <template v-if="!hideHeader">
          <div class="modal-component__header">
            <h3 class="modal-component__title">
              <slot name="title">
                {{ title }}
              </slot>
            </h3>

            <Button
              class="modal-component__close"
              size="s"
              icon-only
              @click="emits('close')"
            >
              <span class="blind">Close modal</span>
            </Button>
          </div>
        </template>

        <!-- Modal body -->
        <div
          ref="modalBodyRef"
          class="modal-component__body"
        >
          <slot></slot>
        </div>

        <!-- Modal footer -->
        <template v-if="!hideFooter">
          <div class="modal-component__footer">
            <slot name="footer">
              <!-- 취소 버튼 -->
              <Button
                v-if="props.onClose && cancelOption.visible"
                :disabled="cancelOption.disabled"
                case="normal"
                @click="emits('close')"
              >
                {{ cancelOption.title }}
              </Button>

              <!-- 저장/확인 버튼 -->
              <Button
                v-if="props.onSubmit && submitOption.visible"
                :disabled="submitOption.disabled"
                case="success"
                @click="emits('submit')"
              >
                {{ submitOption.title }}
              </Button>
            </slot>
          </div>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  import modalComposable, { modalEmits, modalProps } from '@/composables/modules/modal';
  import Button from '@/components/elements/button.vue';

  const emits = defineEmits(modalEmits);
  const props = defineProps(modalProps);

  const {
    TELEPORT_TARGET,

    attrs,

    modalContentRef,
    modalBodyRef,

    cancelOption,
    submitOption,
  } = modalComposable(emits, props);
</script>

<script lang="ts">
  // declare additional options
  export default {
    inheritAttrs: false,
  };
</script>

<style lang="scss" scoped>
  @import '@/styles/components/modules/modal.scss';
</style>
