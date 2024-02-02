import { type CurrencyCode } from '@/configs/unit.config';

// format: YYYY-MM-DD
export type APIDate = string;

// format: YYYY-MM-DDTHH:MM:SS
export type APIDateTime = string;

// 암호화된 id
export type APIEncrypt = string;

// API editor 데이터
export type HTMLContent = string;

// 파일 고유 ID
export type FilesIdEncrypt = string;

// primary key
export type APIPk = number;

export interface APICode<T = string> {
  code: T;
  codeName: string;
}

export interface APIPage {
  /** 현재 페이지 */
  page: number;
  /** 페이지 갯수 */
  size: number;
}

export interface APIList<T> {
  content: T[];
  pageable: {
    pageNumber: number;
  };
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}

export interface APIMoney {
  number: number;
  currencyCode: CurrencyCode;
}

export interface APISuccessCount {
  /** 전체 수 */
  totalCnt: number;
  /** 성공 수 */
  successCnt: number;
  /** 실패 수 */
  failCnt: number;
  /** 실패 메시지 */
  failMessage: string | null;
}
