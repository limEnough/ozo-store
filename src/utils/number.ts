import { isNumber as loadshIsNumber } from 'lodash-es';

/**
 * 콤마 추가
 *
 * @param value
 * @returns 세자리 수 콤마 추가된 value
 */
export const addComma = (value: string | number | null | undefined): string => {
  if (typeof value === 'number' || typeof value === 'string') {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return '';
};

/**
 * 숫자 여부 반환
 *
 * @param value
 * @returns
 */
export const isNumber = (value?: any): value is number => {
  return loadshIsNumber(value);
};

/**
 * 숫자로 이루어진 문자열 (숫자형) 여부 반환
 *
 * @param value
 * @returns
 */
export const isNumeric = (value: string): boolean => {
  return value.length > 0 && /^[\d]*$/.test(value);
};
