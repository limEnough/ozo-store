import type { APICode } from '@/types/api.types';
import dayjs from 'dayjs';

/**
 * 연도 리스트 구하기
 * @param range 구할 연도 범위 (현재 + a)
 * @returns APICode array
 */
const getYearList = (range = 10): APICode<string>[] => {
  const date = dayjs();
  const yearList = [];

  for (let i = 0; i <= Math.abs(range); i++) {
    // 과거 연도 필요로 할 수 있어 아래와 같이 처리
    const parseIntI = range > 0 ? i : -i;

    const year = date.add(parseIntI, 'year').get('year');
    yearList.push({ code: `${year}`, codeName: `${year}년` });
  }

  return yearList;
};

/**
 * 월 리스트 구하기
 * @returns APICode array
 */
const getMonthList = (type = 'month'): APICode<string>[] => {
  const monthList = [];
  const monthText = type === 'month' ? '월' : '개월';

  for (let i = 1; i <= 12; i++) {
    monthList.push({ code: `${i}`, codeName: `${i}${monthText}` });
  }

  return monthList;
};

/**
 * 일 리스트 구하기
 * @param month 해당하는 월
 * @returns APICode array
 */
const getDateList = (month: number, onlyNumber = false, useZero = false): APICode<string>[] => {
  const dateList = [];
  const text = onlyNumber ? '' : '일';

  if (month) {
    const lastDate = dayjs()
      .set('month', month - 1)
      .daysInMonth();

    for (let i = 1; i <= lastDate; i++) {
      dateList.push({ code: `${i}`, codeName: `${i}${text}` });
    }
  }

  if (useZero) {
    dateList.unshift({ code: '0', codeName: `0${text}` });
  }

  return dateList;
};

export { getYearList, getMonthList, getDateList };
