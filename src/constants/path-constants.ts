import { PAGE_CODE_DEPTH1, PAGE_CODE_DEPTH2, PAGE_CODE_MAIN, PAGE_CODE_ERROR } from './page-code-constants';

// #region 에러
export const ERROR_PAGE_NAMES = {
  ['error']: PAGE_CODE_ERROR['ERROR'],
  ['error-404']: PAGE_CODE_ERROR['ERROR_404'],
  ['error-500']: PAGE_CODE_ERROR['ERROR_500'],
} as const;
// #endregion

// #region 메인
export const MAIN_PAGE_NAMES = {
  ['main']: PAGE_CODE_MAIN['MAIN'],
} as const;
// #endregion

// #region 회원
export const MEMBER_PAGE_NAMES = {
  ['member']: PAGE_CODE_DEPTH1['MEMBER'], // 회원 - 1뎁스
  ['member-login']: PAGE_CODE_DEPTH2['LOGIN'], // 로그인 - 2뎁스
  ['member-create']: PAGE_CODE_DEPTH2['CREATE'], // 계정 생성 - 2뎁스
  ['member-search']: PAGE_CODE_DEPTH2['SEARCH'], // 계정 찾기 - 2뎁스
} as const;
// #endregion

// #region 마이페이지
export const MYPAGE_PAGE_NAMES = {
  ['mypage']: PAGE_CODE_DEPTH1['MYPAGE'], // 마이페이지 - 1뎁스
  ['mypage-main']: PAGE_CODE_DEPTH2['MYPAGE_MAIN'], // 메인 - 2뎁스
  ['mypage-profile']: PAGE_CODE_DEPTH2['MYPAGE_PROFILE'], // 프로필관리 - 2뎁스
  ['mypage-wish']: PAGE_CODE_DEPTH2['MYPAGE_WISH'], // 찜 - 2뎁스
  ['mypage-recent']: PAGE_CODE_DEPTH2['MYPAGE_RECENT'], // 최근본상품 - 2뎁스
  ['mypage-order-history']: PAGE_CODE_DEPTH2['MYPAGE_ORDER_HISTORY'], // 주문내역 - 2뎁스
  ['mypage-benefit']: PAGE_CODE_DEPTH2['MYPAGE_BENEFIT'], // 혜택관리 - 2뎁스
  ['mypage-inquiry']: PAGE_CODE_DEPTH2['MYPAGE_INQUIRY'], // 문의내역 - 2뎁스
  ['mypage-review']: PAGE_CODE_DEPTH2['MYPAGE_REVIEW'], // 후기내역 - 2뎁스
  ['mypage-address']: PAGE_CODE_DEPTH2['MYPAGE_ADDRESS'], // 배송지관리 - 2뎁스
} as const;
// #endregion

// #region 상점
export const SHOP_PAGE_NAMES = {
  ['shop']: PAGE_CODE_DEPTH1['SHOP'], // 상점 - 1뎁스
  ['shop-goodsList']: PAGE_CODE_DEPTH2['GOODS_LIST'], // 상품 리스트 - 2뎁스
} as const;
// #endregion
