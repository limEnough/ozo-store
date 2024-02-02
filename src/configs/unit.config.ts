// ISO 639-1 standard language codes

type CurrencyCode =
  | 'USD'
  | 'JPY'
  | 'EUR'
  | 'CRC'
  | 'GBP'
  | 'ILS'
  | 'INR'
  | 'KRW'
  | 'PHP'
  | 'PLN'
  | 'PYG'
  | 'THB'
  | 'UAH'
  | 'VND';

type CurrencySymbols = Record<
  CurrencyCode,
  {
    languageCode: string;
    unit: string;
    dir: 'front' | 'back';
  }
>;

const currencySymbols: CurrencySymbols = {
  USD: {
    languageCode: 'en-US',
    unit: '$', // US Dollar
    dir: 'front',
  },
  JPY: {
    languageCode: 'ja-JP',
    unit: '¥', // Japanese Yen
    dir: 'front',
  },
  EUR: {
    languageCode: 'nl-be',
    unit: '€', // Euro (Belgium)
    dir: 'front',
  },
  CRC: {
    languageCode: 'es-CR',
    unit: '₡', // Costa Rican Colón
    dir: 'front',
  },
  GBP: {
    languageCode: 'en-GB',
    unit: '£', // British Pound Sterling
    dir: 'front',
  },
  ILS: {
    languageCode: 'he-IL',
    unit: '₪', // Israeli New Sheqel
    dir: 'front',
  },
  INR: {
    languageCode: 'hi-IN',
    unit: '₹', // Indian Rupee
    dir: 'front',
  },
  KRW: {
    languageCode: 'ko-KR',
    unit: '원', // South Korean Won
    dir: 'back',
  },
  PHP: {
    languageCode: 'en-PH',
    unit: '₱', // Philippine Peso
    dir: 'front',
  },
  PLN: {
    languageCode: 'pl-PL',
    unit: 'zł', // Polish Zloty
    dir: 'front',
  },
  PYG: {
    languageCode: 'es-PY',
    unit: '₲', // Paraguayan Guarani
    dir: 'front',
  },
  THB: {
    languageCode: 'th-TH',
    unit: '฿', // Thai Baht
    dir: 'front',
  },
  UAH: {
    languageCode: 'uk-UA',
    unit: '₴', // Ukrainian Hryvnia
    dir: 'front',
  },
  VND: {
    languageCode: 'vi-VN',
    unit: '₫', // Vietnamese Dong
    dir: 'front',
  },
};

export type { CurrencySymbols, CurrencyCode };

export { currencySymbols };
