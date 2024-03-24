import { onMounted, type PropType } from 'vue';
import usePageTitle from '@/composables/use/use-page-title';
import useLogout from '@/composables/use/use-logout';

interface Props {
  usingTitle: boolean;
  isLoginPage: boolean;
  isMainPage: boolean;
}

const props = {
  usingTitle: {
    type: Boolean as PropType<Props['usingTitle']>,
    default: true,
  },
  isLoginPage: {
    type: Boolean as PropType<Props['isLoginPage']>,
    default: false,
  },
  isMainPage: {
    type: Boolean as PropType<Props['isLoginPage']>,
    default: false,
  },
};

export default function HeaderLayoutComposable(props: Props) {
  const { pageTitle } = usePageTitle();
  const { logout } = useLogout();

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

  return { pageTitle };
}

export { props as headerLayoutProps };
