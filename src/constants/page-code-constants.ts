type PageCodeEnum =
  | (typeof PAGE_CODE_MAIN)[keyof typeof PAGE_CODE_MAIN]
  | (typeof PAGE_CODE_DEPTH1)[keyof typeof PAGE_CODE_DEPTH1]
  | (typeof PAGE_CODE_DEPTH2)[keyof typeof PAGE_CODE_DEPTH2];

const PAGE_CODE_MAIN = {
  MAIN: 'MAIN',
} as const;

const PAGE_CODE_ERROR = {
  ERROR: 'ERROR',
  ERROR_404: 'ERROR-URL',
  ERROR_500: 'ERROR-SERVER',
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
  LOGIN: 'MENU.MENU_DEPTH_2.LOGIN',
  /** 계정 생성 */
  CREATE: 'MENU.MENU_DEPTH_2.CREATE',
  /** 계정 찾기 */
  SEARCH: 'MENU.MENU_DEPTH_2.SEARCH',
  /** 마이페이지 메인 */
  MYPAGE_MAIN: 'MENU.MENU_DEPTH_2.MYPAGE_MAIN',
  /** 마이페이지 찜 */
  MYPAGE_WISH: 'MENU.MENU_DEPTH_2.MYPAGE_WISH',
  /** 상품 목록 */
  GOODS_LIST: 'MENU.MENU_DEPTH_2.GOODS_LIST',
} as const;

export { PAGE_CODE_MAIN, PAGE_CODE_ERROR, PAGE_CODE_DEPTH1, PAGE_CODE_DEPTH2 };

export type { PageCodeEnum };
