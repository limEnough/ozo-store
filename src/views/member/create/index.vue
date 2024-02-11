<template>
  <component :is="SingleLayout">
    <div class="create">
      <!-- 타이틀 영역 -->
      <Title :data="pageTitle"></Title>

      <!-- 폼 영역 -->
      <!-- TODO: 폼 컴포넌트 생성 -->
      <form class="create__form">
        <Form></Form>
      </form>
    </div>
  </component>
</template>
<script setup lang="ts">
  import createComposable from '@/composables/views/member/create';
  import Title from '@/components/elements/title.vue';
  import Form from '@/components/modules/form.vue';
  import SingleLayout from '@/components/layouts/single-layout.vue';

  const { pageTitle } = createComposable();
</script>
