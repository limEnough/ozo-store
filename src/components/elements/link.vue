<template class="link-component">
  <!-- 외부 링크일 경우 -->
  <template v-if="isExternal">
    <Button
      v-bind="$attrs"
      :href="propsTo as string"
      :case="case"
      :icon="icon"
      tag="a"
      target="_blank"
    >
      <slot> </slot>
    </Button>
  </template>

  <!-- 내부 링크일 경우 -->
  <template v-else>
    <router-link
      v-slot="{ href, navigate, route }"
      :to="targetRoute"
      custom
    >
      <Button
        v-bind="$attrs"
        :case="case"
        :icon="icon"
        @click="handleClick($event, href, navigate, route)"
      >
        <slot></slot>
      </Button>
    </router-link>
  </template>
</template>

<script setup lang="ts">
  import linkComposable, { linkProps } from '@/composables/elements/link';
  import Button from '@/components/elements/button.vue';

  const props = defineProps(linkProps);

  const { propsTo, targetRoute, handleClick } = linkComposable(props);
</script>

<script lang="ts">
  // declare additional options
  export default {
    inheritAttrs: false,
  };
</script>

<style lang="scss" scoped>
  @import '@/styles/components/elements/link.scss';
</style>
