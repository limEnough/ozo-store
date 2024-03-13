import { ref } from 'vue';
import { defineStore } from 'pinia';

interface TokenInfo {
  authToken: string;
  expirationTime: number;
}

export const useLayoutStore = defineStore('layout', () => {
  const token = ref(localStorage.getItem('token') ?? null);
  const isLoggedIn = ref(!!localStorage.getItem('token'));

  const saveAuth = (tokenInfo: TokenInfo) => {
    token.value = tokenInfo.authToken;
    isLoggedIn.value = true;

    // 로컬스토리지에 인증 토큰 저장
    localStorage.setItem('token', token.value);

    // 로컬스토리지에 토큰 만료 기간 저장
    localStorage.setItem('expirationTime', `${tokenInfo.expirationTime}`);
  };

  const deleteAuth = () => {
    token.value = null;
    isLoggedIn.value = false;

    // 로컬스토리지에 인증 토큰 삭제
    localStorage.removeItem('token');

    // 로컬스토리지에 토큰 만료 기간 삭제
    localStorage.removeItem('expirationTime');
  };

  return {
    token,
    isLoggedIn,
    saveAuth,
    deleteAuth,
  };
});
