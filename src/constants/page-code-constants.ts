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
  // #region 회원
  /** 로그인 */
  LOGIN: 'MENU.MENU_DEPTH_2.LOGIN',
  /** 계정 생성 */
  CREATE: 'MENU.MENU_DEPTH_2.CREATE',
  /** 계정 찾기 */
  SEARCH: 'MENU.MENU_DEPTH_2.SEARCH',
  // #endregion

  // #region 마이페이지
  /** 마이페이지 메인 */
  MYPAGE_MAIN: 'MENU.MENU_DEPTH_2.MYPAGE_MAIN',
  /** 마이페이지 프로필관리 */
  MYPAGE_PROFILE: 'MENU.MENU_DEPTH_2.MYPAGE_PROFILE',
  /** 마이페이지 찜 */
  MYPAGE_WISH: 'MENU.MENU_DEPTH_2.MYPAGE_WISH',
  /** 마이페이지 최근본상품 */
  MYPAGE_RECENT: 'MENU.MENU_DEPTH_2.MYPAGE_RECENT',
  /** 마이페이지 주문내역 */
  MYPAGE_ORDER_HISTORY: 'MENU.MENU_DEPTH_2.MYPAGE_ORDER_HISTORY',
  /** 마이페이지 혜택관리 */
  MYPAGE_BENEFIT: 'MENU.MENU_DEPTH_2.MYPAGE_BENEFIT',
  /** 마이페이지 문의내역 */
  MYPAGE_INQUIRY: 'MENU.MENU_DEPTH_2.MYPAGE_INQUIRY',
  /** 마이페이지 후기내역 */
  MYPAGE_REVIEW: 'MENU.MENU_DEPTH_2.MYPAGE_REVIEW',
  /** 마이페이지 배송지관리 */
  MYPAGE_ADDRESS: 'MENU.MENU_DEPTH_2.MYPAGE_ADDRESS',
  // #endregion

  // #region 상품
  /** 상품 목록 */
  GOODS_LIST: 'MENU.MENU_DEPTH_2.GOODS_LIST',
  // #endregion
} as const;

export { PAGE_CODE_MAIN, PAGE_CODE_ERROR, PAGE_CODE_DEPTH1, PAGE_CODE_DEPTH2 };

export type { PageCodeEnum };
