export const LANG = {
  KO: 'ko',
  EN: 'en',
} as const;

export type Lang = (typeof LANG)[keyof typeof LANG];
