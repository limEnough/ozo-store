type PageCodeEnum =
  | (typeof PAGE_CODE_MAIN)[keyof typeof PAGE_CODE_MAIN]
  | (typeof PAGE_CODE_DEPTH1)[keyof typeof PAGE_CODE_DEPTH1]
  | (typeof PAGE_CODE_DEPTH2)[keyof typeof PAGE_CODE_DEPTH2];

const PAGE_CODE_MAIN = {
  MAIN: 'MAIN',
} as const;

const PAGE_CODE_DEPTH1 = {
  /** 회원 */
  MEMBER: 'MENU.MENU_DEPTH_1.MEMBER',
  /** 마이페이지 */
  MYPAGE: 'MENU.MENU_DEPTH_1.MYPAGE',
  /** 상점 */
  SHOP: 'MENU.MENU_DEPTH_1.SHOP',
} as const;

const PAGE_CODE_DEPTH2 = {
  /** 로그인 */
  LOGIN: 'MENU.MENU_DEPTH_1.LOGIN',
  /** 마이페이지 메인 */
  MYPAGE_MAIN: 'MENU.MENU_DEPTH_2.MYPAGE_MAIN',
  /** 상품 목록 */
  GOODS_LIST: 'MENU.MENU_DEPTH_2.GOODS_LIST',
} as const;

export { PAGE_CODE_MAIN, PAGE_CODE_DEPTH1, PAGE_CODE_DEPTH2 };

export type { PageCodeEnum };
