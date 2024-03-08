const FIREBASE_AUTH_ERROR_CODE = {
  INVALID_CREDENTIAL: 'auth/invalid-credential',
  USER_NOT_FOUND: 'auth/user-not-found',
  WRONG_PASSWORD: 'auth/wrong-password',
  ALREADY_USE: 'auth/email-already-in-use',
  WEAK_PASSWORD: 'auth/weak-password',
  NETWORK_FAILED: 'network-request-failed',
  INVALID_EMAIL: 'auth/invalid-email',
  INTERNAL_ERROR: 'auth/internal-error',
};

type FirebaseAuthErrorCode = (typeof FIREBASE_AUTH_ERROR_CODE)[keyof typeof FIREBASE_AUTH_ERROR_CODE];

const FIREBASE_AUTH_ERROR_MESSAGE = {
  INVALID_CREDENTIAL: '이메일 혹은 비밀번호가 일치하지 않습니다.',
  USER_NOT_FOUND: '이메일 혹은 비밀번호가 일치하지 않습니다.',
  WRONG_PASSWORD: '이메일 혹은 비밀번호가 일치하지 않습니다.',
  INVALID_EMAIL: '잘못된 이메일 형식입니다.',
  ALREADY_USE: '이미 사용 중인 이메일입니다.',
  WEAK_PASSWORD: '비밀번호는 6글자 이상이어야 합니다.',
  INTERNAL_ERROR: '잘못된 요청입니다.',
  NETWORK_FAILED: '네트워크 연결에 실패 하였습니다.',
};

export { FIREBASE_AUTH_ERROR_CODE, FIREBASE_AUTH_ERROR_MESSAGE };
export type { FirebaseAuthErrorCode };
