import type { APICode } from '@/types/api.types';

const MEMBER_GENDER_CODE = {
  MALE: 'GENDER.MALE',
  FEMALE: 'GENDER.FEMALE',
} as const;

type MemberGenderCode = (typeof MEMBER_GENDER_CODE)[keyof typeof MEMBER_GENDER_CODE];

const MEMBER_TERMS_CODE = {
  OVER14: 'TERMS.AGREE.OVER14',
  USE: 'TERMS.AGREE.USE',
  PRIVACY: 'TERMS.AGREE.PRIVACY',
  MARKETINGRECEIVE: 'TERMS.AGREE.MARKETINGRECEIVE',
} as const;

type MemberTermsCode = (typeof MEMBER_TERMS_CODE)[keyof typeof MEMBER_TERMS_CODE];

export { MEMBER_GENDER_CODE, MEMBER_TERMS_CODE };
export type { MemberGenderCode, MemberTermsCode };
