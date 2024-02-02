import type { RouteRecordName } from 'vue-router';
import { MAIN_PAGE_NAMES, MEMBER_PAGE_NAMES, MYPAGE_PAGE_NAMES, SHOP_PAGE_NAMES } from '@/constants/path-constants';

type RouterAccessKey = 'UserAccessibleNames' | 'NonUserAccessibleNames';

const routerAccess: Record<RouterAccessKey, RouteRecordName[]> = {
  /**
   * 로그인 유저 접속 가능 ROUTE NAME
   */
  UserAccessibleNames: [MYPAGE_PAGE_NAMES['mypage-main']],
  /**
   * 비로그인 유저 접속 가능 ROUTE NAME
   */
  NonUserAccessibleNames: [
    MAIN_PAGE_NAMES['main'],
    MEMBER_PAGE_NAMES['member-login'],
    SHOP_PAGE_NAMES['shop-goodsList'],
  ],
};

export default {
  routerAccess,
};
