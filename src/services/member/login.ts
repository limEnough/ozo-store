import { FIREBASE_AUTH_ERROR_CODE, FIREBASE_AUTH_ERROR_MESSAGE } from '@/constants/error-code.constants';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useUserStore } from '@/stores/user';

interface LoginForm {
  email: string;
  password: string;
}

interface AuthToken {
  authToken: string;
  expirationTime: number;
}

interface UserAuth {
  email: LoginForm['email'];
  authToken: AuthToken['authToken'];
  expirationTime: AuthToken['expirationTime'];
}
export default class MemberLoginService {
  // private readonly collectionId = 'users';

  /**
   * 로그인
   */
  public async authLogin(values: LoginForm): Promise<UserAuth | string> {
    try {
      // 1. auth 로그인
      const { user } = await signInWithEmailAndPassword(auth, values.email, values.password);
      const { stsTokenManager } = user;

      // 2. userInfo 업데이트
      const userStore = useUserStore();
      userStore.updateUserInfo(user.email);

      return {
        email: values.email, // '이메일 저장하기' 기능을 위해
        authToken: stsTokenManager.accessToken,
        expirationTime: stsTokenManager.expirationTime,
      };
    } catch ({ code, messages }) {
      if (!code) return '로그인에 실패 하였습니다.';

      switch (code) {
        case FIREBASE_AUTH_ERROR_CODE['INVALID_CREDENTIAL']:
          return FIREBASE_AUTH_ERROR_MESSAGE['INVALID_CREDENTIAL'];
        case FIREBASE_AUTH_ERROR_CODE['USER_NOT_FOUND']:
          return FIREBASE_AUTH_ERROR_MESSAGE['USER_NOT_FOUND'];
        case FIREBASE_AUTH_ERROR_CODE['WRONG_PASSWORD']:
          return FIREBASE_AUTH_ERROR_MESSAGE['WRONG_PASSWORD'];
        case FIREBASE_AUTH_ERROR_CODE['ALREADY_USE']:
          return FIREBASE_AUTH_ERROR_MESSAGE['ALREADY_USE'];
        case FIREBASE_AUTH_ERROR_CODE['WEAK_PASSWORD']:
          return FIREBASE_AUTH_ERROR_MESSAGE['WEAK_PASSWORD'];
        case FIREBASE_AUTH_ERROR_CODE['NETWORK_FAILED']:
          return FIREBASE_AUTH_ERROR_MESSAGE['NETWORK_FAILED'];
        case FIREBASE_AUTH_ERROR_CODE['INVALID_EMAIL']:
          return FIREBASE_AUTH_ERROR_MESSAGE['INVALID_EMAIL'];
        case FIREBASE_AUTH_ERROR_CODE['INTERNAL_ERROR']:
          return FIREBASE_AUTH_ERROR_MESSAGE['INTERNAL_ERROR'];
        default:
          return '로그인에 실패 하였습니다.';
      }
    }
  }

  /**
   * 로그아웃
   */
  public async authLogOut() {
    try {
      // 1. auth 로그아웃
      await signOut(auth);

      // 2. userInfo 업데이트
      const userStore = useUserStore();
      userStore.updateUserInfo(null);
    } catch ({ code, messages }) {
      console.error('authLogOut error: ', code);
    }
  }
}

export type { LoginForm as MemberLoginForm, AuthToken as MemberAuthToken };
