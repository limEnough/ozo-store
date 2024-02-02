import { PAGE_CODE_DEPTH1, PAGE_CODE_DEPTH2, PAGE_CODE_MAIN } from './page-code-constants';

// #region 메인
export const MAIN_PAGE_NAMES = {
  ['main']: PAGE_CODE_MAIN['MAIN'],
} as const;
// #endregion

// #region 회원
export const MEMBER_PAGE_NAMES = {
  ['member']: PAGE_CODE_DEPTH1['MEMBER'], // 회원 - 1뎁스
  ['member-login']: PAGE_CODE_DEPTH2['LOGIN'], // 로그인 - 2뎁스
} as const;
// #endregion

// #region 마이페이지
export const MYPAGE_PAGE_NAMES = {
  ['mypage']: PAGE_CODE_DEPTH1['MYPAGE'], // 마이페이지 - 1뎁스
  ['mypage-main']: PAGE_CODE_DEPTH2['MYPAGE_MAIN'], // 메인 - 2뎁스
} as const;
// #endregion

// #region 상점
export const SHOP_PAGE_NAMES = {
  ['shop']: PAGE_CODE_DEPTH1['SHOP'], // 상점 - 1뎁스
  ['shop-goodsList']: PAGE_CODE_DEPTH2['GOODS_LIST'], // 상품 리스트 - 2뎁스
} as const;
// #endregion
