/**
 * MEMO: logout 로직에 쓰인 useRouter는 setup 안에서만 사용할 수 있기에
 * setup에서 한번 실행된 후, 필요 로직(logout)을 꺼내쓸 수 있도록 use 함수로 뺐습니다.
 */
import { MAIN_PAGE_NAMES } from '@/constants/path-constants';
import MemberLoginService from '@/services/member/login';
import { useLayoutStore } from '@/stores/layout';
import { useRouter } from 'vue-router';

export default function useLogout() {
  const pageService = new MemberLoginService();
  const layoutStore = useLayoutStore();

  const router = useRouter();

  const logout = async () => {
    await pageService.authLogOut();
    layoutStore.deleteAuth();

    router.push({
      name: MAIN_PAGE_NAMES['main'],
    });
  };

  return {
    logout,
  };
}
