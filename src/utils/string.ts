import { unescape } from 'lodash-es';
import type { HTMLContent } from '@/types/api.types';

type CountType = 'count' | 'byte';

/**
 * @brief 글자 하나의 바이트 구하기
 * @param decimal 10진법 숫자
 * @param charset 인코딩 문자
 * @returns byte
 */
const getByteLength = (decimal: number, charset = 'utf-8') => {
  if (charset.toLowerCase() === 'euc-kr') {
    const LINE_FEED = 10; // '\n'
    return decimal >> 7 || LINE_FEED === decimal ? 2 : 1;
  } else {
    return decimal >> 11 ? 3 : decimal >> 7 ? 2 : 1;
  }
};

/**
 * @brief Byte 구하기
 * @param inputText 입력한 텍스트
 * @param charset 인코딩 문자
 * @returns byte
 */
const getBytes = (inputText: string, charset = 'utf-8') => {
  let returnLength = 0;

  if (charset.toLowerCase() === 'euc-kr') {
    returnLength = (function (s: string, b?: number, i?: number, c?: number) {
      for (b = i = 0; (c = s.charCodeAt(i++)); b += c == 10 ? 2 : c >> 7 ? 2 : 1);
      return b;
    })(inputText);
  } else {
    returnLength = (function (s: string, b?: number, i?: number, c?: number) {
      for (b = i = 0; (c = s.charCodeAt(i++)); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
      return b;
    })(inputText);
  }

  return returnLength;
};

/**
 *
 * @description 숫자인 문자열을 변형 후 다시 문자열로 변경
 * @param curr 현재 값(string)
 * @param acc 변형할 값(number)
 * @param options padStart 옵션
 * @returns
 */
const transformAndPadNumber = (
  curr: string,
  acc?: number,
  options?: { maxLength: number; fillString?: string | undefined },
): string => {
  let returnValue = String(Number(curr));

  if (acc) {
    returnValue = String(Number(returnValue) + acc);
  }

  if (options) {
    returnValue = returnValue.padStart(options.maxLength, options.fillString);
  }

  return returnValue;
};

/**
 * @brief 글자 수 자르기
 * @param target input
 * @param length 자를 글자 수
 */
const handleInputCut = (target: Event['target'], length: number) => {
  if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)
    target.value = target.value.slice(0, length).toString();
};

/**
 * @brief Byte 길이에 따라 자르기
 * @param target input
 * @param byte 자를 byte
 * @param charset 인코딩 문자
 */
const handleInputByteCut = (target: Event['target'], byte: number, charset = 'utf-8') => {
  if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)
    target.value = getLimitedByteText(target.value, byte, charset);
};

/**
 * 제한 글자수에 따라 컷팅된 텍스트
 * @param inputText 입력한 텍스트
 * @param maxByte 최대 Byte
 * @param charset 입력한 문자
 */
const getLimitedByteText = (inputText: string, maxByte: number, charset = 'utf-8') => {
  const characters = inputText.split('');
  let validText = '';
  let totalByte = 0;

  for (let i = 0; i < characters.length; i += 1) {
    const character = characters[i];
    const decimal = character.charCodeAt(0);
    const byte = getByteLength(decimal, charset); // 글자 한 개가 몇 바이트 길이인지 구해주기

    // 현재까지의 바이트 길이와 더해 최대 바이트 길이를 넘지 않으면
    if (totalByte + byte <= maxByte) {
      totalByte += byte; // 바이트 길이 값을 더해 현재까지의 총 바이트 길이 값을 구함
      validText += character; // 글자를 더해 현재까지의 총 문자열 값을 구함
    } else {
      // 최대 바이트 길이를 넘으면
      break; // for 루프 종료
    }
  }

  return validText;
};

export function convertStringToHTML(html: HTMLContent) {
  const result = unescape(html);

  return result;
}

export { getByteLength, getBytes, handleInputCut, handleInputByteCut, transformAndPadNumber, type CountType };
