<template>
  <component :is="DefaultLayout">
    <div class="profile">
      <Ready></Ready>
    </div>
  </component>
</template>

<script setup lang="ts">
  import DefaultLayout from '@/components/layouts/default-layout.vue';
  import Ready from '@/components/elements/ready.vue';
</script>
