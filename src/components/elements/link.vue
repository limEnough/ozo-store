<template class="link-component">
  <!-- 외부 링크일 경우 -->
  <template v-if="isExternal">
    <a
      :href="propsTo as string"
      target="_blank"
      v-bind="$attrs"
      class="link-component__button"
    >
      <slot></slot>
    </a>
  </template>

  <!-- 내부 링크일 경우 -->
  <template v-else>
    <router-link
      v-slot="{ href, navigate, route }"
      :to="targetRoute"
      custom
    >
      <button
        type="button"
        v-bind="$attrs"
        class="link-component__button"
        @click="handleClick($event, href, navigate, route)"
      >
        <slot></slot>
      </button>
    </router-link>
  </template>
</template>

<script setup lang="ts">
  import linkComposables, { linkProps } from '@/composables/elements/link';

  const props = defineProps(linkProps);

  const { propsTo, targetRoute, handleClick } = linkComposables(props);
</script>

<style lang="scss" scoped>
  @import '@/styles/components/elements/link.scss';
</style>
