import { defineStore } from 'pinia';
import { ref } from 'vue';
import LayoutService from '@/services/systems/layout';
import type { MemberCreateAccount } from '@/services/member/create';
import type { Goods } from '@/composables/modules/goods';

/** 유저 장바구니 정보 */
interface Cart {
  total: number;
  goods: Goods[];
}

/** 유저 정보 */
interface UserPersonalInfo {
  name: MemberCreateAccount['name'];
  email: MemberCreateAccount['email'];
  phoneNumber: MemberCreateAccount['phoneNumber'];
  // 휴면회원 여부
  // isDormant: boolean;
  // 비밀번호 만료일
  // isExpiredPassword: boolean;
}

/** 유저 접속 상태 */
interface UserState {
  userKey: UserPersonalInfo['email'];
  info: UserPersonalInfo;
  cart: Cart;
  wish: Goods['goodsId'][];
}

export const useUserStore = defineStore('user', () => {
  const layoutService = new LayoutService();
  const userInfo = ref<UserState | null>(null);

  /**
   * 유저 정보 업데이트
   */
  const updateUserInfo = async (email: string | null) => {
    if (!email) {
      // 로그아웃 시, 유저정보 비우기
      userInfo.value = null;
      return;
    }

    // 유저 정보 조회
    const result = await layoutService.getUserInfo(email);

    // 유저 정보 셋팅
    userInfo.value = result ?? null;
  };

  return {
    updateUserInfo,
    userInfo,
  };
});

export type { UserState };
