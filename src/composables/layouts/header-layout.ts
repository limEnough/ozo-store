import { computed, type PropType } from 'vue';
import { useRoute } from 'vue-router';
import usePageTitle from '@/composables/use/use-page-title';
import { PAGE_CODE_DEPTH2 } from '@/constants/page-code-constants';

interface Props {
  usingTitle: boolean;
}

const props = {
  usingTitle: {
    type: Boolean as PropType<Props['usingTitle']>,
    default: true,
  },
};

export default function HeaderLayoutComposable(props: Props) {
  const { pageTitle } = usePageTitle();
  const route = useRoute();

  const isLoginPage = computed(() => route.meta.pageCode === PAGE_CODE_DEPTH2['LOGIN']);

  return { pageTitle, isLoginPage };
}

export { props as headerLayoutProps };
