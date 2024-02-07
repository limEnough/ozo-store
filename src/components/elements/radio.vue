<template>
  <label
    :class="`background--${bgColor}`"
    class="radio-component"
    v-bind="styleAttrs"
  >
    <input
      :checked="isChecked"
      :value="value"
      :name="name"
      ref="refRadio"
      type="radio"
      class="radio-component__input"
      v-bind="inputAttrs"
      @click="handleClick($event)"
    />
    <span
      v-if="!textOnly"
      class="radio-component__icon"
    >
      <span class="blind">
        {{ value }}
      </span>
    </span>

    <slot name="label">
      <span
        :class="`text--${color}`"
        class="radio-component__label"
      >
        <slot></slot>
      </span>
    </slot>
  </label>
</template>

<script setup lang="ts">
  import radioComposable, { radioEmits, radioProps } from '@/composables/elements/radio';

  const emits = defineEmits(radioEmits);
  const props = defineProps(radioProps);

  const {
    refRadio,

    isChecked,
    styleAttrs,
    inputAttrs,

    handleClick,
  } = radioComposable(emits, props);
</script>

<style lang="scss" scoped>
  @import '@/styles/components/elements/radio.scss';
</style>
