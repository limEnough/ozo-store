import { PAGE_CODE_DEPTH2, PAGE_CODE_MAIN } from '@/constants/page-code-constants';
import { computed, type PropType } from 'vue';
import { useRoute } from 'vue-router';

interface Props {
  isShowDockbar: boolean;
  isShowFooter: boolean;
  isLoading: boolean;
}

const props = {
  isShowDockbar: {
    type: Boolean as PropType<Props['isShowDockbar']>,
    default: true,
  },
  isShowFooter: {
    type: Boolean as PropType<Props['isShowFooter']>,
    default: true,
  },
  isLoading: {
    type: Boolean as PropType<Props['isLoading']>,
    default: false,
  },
};

export default function defaultLayoutComposable(props: Props) {
  const route = useRoute();

  const isLoginPage = computed(() => route.meta.pageCode === PAGE_CODE_DEPTH2['LOGIN']);
  const isMainPage = computed(() => route.meta.pageCode === PAGE_CODE_MAIN['MAIN']);

  return { isLoginPage, isMainPage };
}

export { props as defaultLayoutProps };
