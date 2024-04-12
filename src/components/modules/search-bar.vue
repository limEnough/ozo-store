<template>
  <div
    :class="hasSearchSuggestion ? 'keyword' : ''"
    class="serach-bar-component"
    aria-label="검색 바"
  >
    <slot name="before"></slot>

    <Input
      v-model="searchKeyword"
      :use-length-count="false"
      placeholder="Search"
      maxlength="30"
      is-search
      clearable
    ></Input>

    <slot name="after"></slot>
  </div>
</template>

<script setup lang="ts">
  import searchBarComposable, { searchBarEmits, searchBarProps } from '@/composables/modules/search-bar';
  import Input from '@/components/elements/input.vue';

  const emits = defineEmits(searchBarEmits);
  const props = defineProps(searchBarProps);

  const { hasSearchSuggestion, searchKeyword } = searchBarComposable(emits, props);
</script>

<style lang="scss" scoped>
  @import '@/styles/components/modules/search-bar.scss';
</style>
