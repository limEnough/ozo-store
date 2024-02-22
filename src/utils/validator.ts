/**
 * undefined, null, 빈 문자열 여부
 *
 * @param value
 * @returns
 */
export function isEmpty(value: unknown): boolean {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === 'string' && !value.trim().length) {
    return true;
  }

  return false;
}

/**
 * 전화번호 빈 값 (-) 여부
 *
 * @param value
 * @returns
 */
export function isPhoneEmpty(value: string): boolean {
  return !value || !value.length || /^-$/.test(value);
}

/**
 * 올바른 휴대폰번호인지 여부
 *
 * @param value
 * @returns
 */
export function validateCellPhone(value: string): boolean {
  const cellPhoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;

  return cellPhoneRegex.test(value);
}

/**
 *  올바른 전화번호인지 여부
 *
 * @param value
 * @returns
 */
export function validateTotalPhoneNumber(value: string): boolean {
  const cellPhonePrefix = [...formConfig.phone.mobile, ...formConfig.phone.area].join('|');
  const nationalPrefix = [...formConfig.phone.national].join('|');

  const phoneRegex = [
    /** 휴대폰 번호 */
    new RegExp(`^(${cellPhonePrefix})-[0-9*]{3,4}-([0-9*]{4})$`),
    /** 전국 대표 번호 */
    new RegExp(`^(${nationalPrefix})-[0-9*]{4}$`),
  ];

  const result = phoneRegex.some((reg) => reg.test(value));

  return result;
}

/**
 * 올바른 이메일인지 여부
 *
 * @param value
 * @returns
 */
export function validateEmail(value: string): boolean {
  const emailRegx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  return emailRegx.test(value);
}

/**
 * 올바른 비밀번호인지 여부
 *
 * @param value
 * @returns
 */
export function validatePassword(value: string): boolean {
  const pwRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*()_+[\]{}|;:',./<>?\\]).{8,16}$/;

  return pwRegex.test(value);
}

/**
 * 한글, 영어 대소문자로만 이루어져있는지 여부
 *
 * @param value
 * @returns
 */
export function validateKoreanEnglish(value: string): boolean {
  const koreanEnglishRegex = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]+$/u;

  return koreanEnglishRegex.test(value);
}

/*
 * 한글, 영어 대소문자, 키보드내 특수문자로만 이루어져있는지 여부
 *
 * @param value
 * @returns
 */
export function validateKeyboardString(value: string): boolean {
  const koreanEnglishRegex = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9~!@#$%^&*()_+-=[\]{};':",.<>/?\\|]+$/u;

  return koreanEnglishRegex.test(value);
}
