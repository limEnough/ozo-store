import { computed } from 'vue';
import { useRoute } from 'vue-router';

// 현재 라우터의 meta.pageTitle을 가져오는 로직
export default function usePageTitle() {
  const route = useRoute();
  const pageTitle = computed(() => route.meta.pageTitle ?? '');

  return {
    pageTitle,
  };
}
