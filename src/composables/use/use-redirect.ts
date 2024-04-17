import { MAIN_PAGE_NAMES, MEMBER_PAGE_NAMES, MYPAGE_PAGE_NAMES } from '@/constants/path-constants';
import { useRouter } from 'vue-router';

export function useRedirect() {
  const router = useRouter();

  const redirectToLogin = () => {
    return router.push({ name: MEMBER_PAGE_NAMES['member-login'] });
  };

  const redirectToMain = () => {
    return router.push({ name: MAIN_PAGE_NAMES['main'] });
  };

  const redirectToMyMain = () => {
    return router.push({ name: MYPAGE_PAGE_NAMES['mypage-main'] });
  };

  return {
    redirectToLogin,
    redirectToMain,
    redirectToMyMain,
  };
}
