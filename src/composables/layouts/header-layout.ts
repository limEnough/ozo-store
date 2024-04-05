import { computed, onMounted, type PropType } from 'vue';
import usePageTitle from '@/composables/use/use-page-title';
import useLogout from '@/composables/use/use-logout';

interface Props {
  isLoginPage: boolean;
  isMainPage: boolean;
}

const props = {
  isLoginPage: {
    type: Boolean as PropType<Props['isLoginPage']>,
    default: false,
  },
  isMainPage: {
    type: Boolean as PropType<Props['isMainPage']>,
    default: false,
  },
};

export default function HeaderLayoutComposable(props: Props) {
  const { pageTitle } = usePageTitle();
  const { logout } = useLogout();

  const isShowTitlePage = computed(() => {
    return !props.isLoginPage && !props.isMainPage;
  });

  const fetchClient = () => {
    if (!localStorage.getItem('expirationTime')) return;

    const expirationTime = parseInt(localStorage.getItem('expirationTime') as string);

    if (expirationTime > 0) {
      const currentTime = new Date().getTime();
      const remainTime = expirationTime - currentTime;

      setTimeout(async () => {
        await logout();
      }, remainTime);
    } else {
      // 인증 만료기간 종료
      localStorage.removeItem('expirationTime');
    }
  };

  onMounted(() => {
    fetchClient();
  });

  return { pageTitle, isShowTitlePage };
}

export { props as headerLayoutProps };
