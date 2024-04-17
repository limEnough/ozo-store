/**
 * MEMO: logout 로직에 쓰인 useRouter는 setup 안에서만 사용할 수 있기에
 * setup에서 한번 실행된 후, 필요 로직(logout)을 꺼내쓸 수 있도록 use 함수로 뺐습니다.
 */
import MemberLoginService from '@/services/member/login';
import { useLayoutStore } from '@/stores/layout';
import { useRedirect } from './use-redirect';

export default function useLogout() {
  const pageService = new MemberLoginService();
  const layoutStore = useLayoutStore();
  const { redirectToMain } = useRedirect();

  const logout = async () => {
    await pageService.authLogOut();
    layoutStore.deleteAuth();

    redirectToMain();
  };

  return {
    logout,
  };
}
