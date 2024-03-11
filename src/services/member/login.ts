import { FIREBASE_AUTH_ERROR_CODE, FIREBASE_AUTH_ERROR_MESSAGE } from '@/constants/error-code.constants';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import type { MemberCreateAccount } from './create';

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

interface UserInfo extends Pick<MemberCreateAccount, 'name'> {
  cart: string[]; //TODO: 상품 컴포넌트 개발 후 작업할 것
}

export default class MemberLoginService {
  // private readonly collectionId = 'users';

  /**
   * 유저 인증 결과 가져오기
   */
  public async getUserAuth(values: LoginForm): Promise<UserAuth | string> {
    try {
      const { user } = await signInWithEmailAndPassword(auth, values.email, values.password);
      const { stsTokenManager } = user;

      return {
        email: values.email, // '이메일 저장하기' 기능
        authToken: stsTokenManager.accessToken,
        expirationTime: stsTokenManager.expirationTime,
      };
    } catch (error: unknown) {
      if (!error.code) return '로그인에 실패 하였습니다.';

      switch (error.code) {
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
   * TODO: 로그인된 유저 정보 가져오기
   */
  public async getUserInfo() {
    try {
      // datebase 조회 후 필요 정보 가져오기
    } catch (error: unknown) {
      console.log(error);
    }
  }
}

export type { LoginForm as MemberLoginForm, AuthToken as MemberAuthToken };
