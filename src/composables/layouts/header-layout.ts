import { computed, onMounted, type PropType } from 'vue';
import { useRoute } from 'vue-router';
import usePageTitle from '@/composables/use/use-page-title';
import { PAGE_CODE_DEPTH2 } from '@/constants/page-code-constants';
import { useLayoutStore } from '@/stores/layout';

interface Props {
  usingTitle: boolean;
  isLoginHeader: boolean;
}

const props = {
  usingTitle: {
    type: Boolean as PropType<Props['usingTitle']>,
    default: true,
  },
  isLoginHeader: {
    type: Boolean as PropType<Props['isLoginHeader']>,
    default: false,
  },
};

export default function HeaderLayoutComposable(props: Props) {
  const route = useRoute();
  const layoutStore = useLayoutStore();
  const { pageTitle } = usePageTitle();

  const isLoginPage = computed(() => route.meta.pageCode === PAGE_CODE_DEPTH2['LOGIN']);

  const fetchClient = () => {
    if (!localStorage.getItem('expirationTime')) return;

    const expirationTime = parseInt(localStorage.getItem('expirationTime') as string);

    if (expirationTime > 0) {
      const currentTime = new Date().getTime();
      const remainTime = expirationTime - currentTime;

      setTimeout(() => {
        layoutStore.deleteAuth();
      }, remainTime);
    } else {
      // 인증 만료기간 종료
      localStorage.removeItem('expirationTime');
    }
  };

  onMounted(() => {
    fetchClient();
  });
  return { pageTitle, isLoginPage };
}

export { props as headerLayoutProps };
