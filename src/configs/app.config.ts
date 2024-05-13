import type { RouteRecordName } from 'vue-router';
import { MAIN_PAGE_NAMES, MEMBER_PAGE_NAMES, MYPAGE_PAGE_NAMES, SHOP_PAGE_NAMES } from '@/constants/path-constants';

// teleport 사용 시 to에 바인딩할 셀렉터
export const TELEPORT_TARGET = '#teleported';

type RouterAccessKey = 'UserAccessibleNames' | 'UserRedirectNames' | 'NonUserAccessibleNames';

const routerAccess: Record<RouterAccessKey, RouteRecordName[]> = {
  /**
   * 로그인 유저 접속 가능 ROUTE NAME
   */
  UserAccessibleNames: [MYPAGE_PAGE_NAMES['mypage-main'], MYPAGE_PAGE_NAMES['mypage-wish']],
  /**
   * 로그인 유저 리다이렉트 ROUTE NAME
   */
  UserRedirectNames: [MEMBER_PAGE_NAMES['member-login'], MEMBER_PAGE_NAMES['member-create']],
  /**
   * 비로그인 유저 접속 가능 ROUTE NAME
   */
  NonUserAccessibleNames: [
    MAIN_PAGE_NAMES['main'],
    MEMBER_PAGE_NAMES['member-login'],
    SHOP_PAGE_NAMES['shop-goods-list'],
  ],
};

export default {
  routerAccess,
};
