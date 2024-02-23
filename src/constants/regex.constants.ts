const ALLOWED_REGEXS = {
  /** 숫자 */
  ONLY_NUMBER: /[^0-9]/g,

  ONLY_NUMBER_SPACE: /[^0-9\s]/g,

  /** 한글 */
  ONLY_KOREAN: /[^ㄱ-힣]/g,

  ONLY_KOREAN_SPACE: /[^ㄱ-힣\s]/g,

  /** 영어 */
  ONLY_ENGLISH: /[^a-zA-Z]/g,

  ONLY_ENGLISH_SPACE: /[^a-zA-Z\s]/g,

  /** 영어, 숫자 */
  ONLY_ENGLISH_NUMBER: /[^a-zA-Z0-9]/g,

  ONLY_ENGLISH_NUMBER_SPACE: /[^a-zA-Z0-9\s]/g,

  /** 영어, 한글 */
  ONLY_KOREAN_ENGLISH: /[^ㄱ-힣a-zA-Z]/g,

  ONLY_KOREAN_ENGLISH_SPACE: /[^ㄱ-힣a-zA-Z\s]/g,

  /** 영어, 한글, 숫자 */
  ONLY_KOREAN_ENGLISH_NUMBER: /[^ㄱ-힣a-zA-Z0-9]/g,

  ONLY_KOREAN_ENGLISH_NUMBER_SPACE: /[^ㄱ-힣a-zA-Z0-9\s]/g,

  /** 키보드 모든 문자 */
  ALL_KEYBOARD_CHARACTERS: /[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9~!@#$%^&*()_+\-=[\]{};':"\\|,./`<>/?]/g,

  ALL_KEYBOARD_CHARACTERS_SPACE: /[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9~!@#$%^&*()_+\-=[\]{};':"\\|,./`<>/?\s]/g,
} as const;

type AllowedRegexsKeys = keyof typeof ALLOWED_REGEXS;

export { ALLOWED_REGEXS };

export type { AllowedRegexsKeys };
