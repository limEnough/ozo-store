import { MAIN_PAGE_NAMES } from '@/constants/path-constants';
import { computed, type PropType } from 'vue';
import { useRoute } from 'vue-router';

interface Props {
  isShowDockbar: boolean;
  isShowFooter: boolean;
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
};

export default function defaultLayoutComposable(props: Props) {
  const route = useRoute();

  const isLoginHeader = computed(() => route.name === MAIN_PAGE_NAMES['main']);

  return { isLoginHeader };
}

export { props as defaultLayoutProps };
