import type { RuleExpression } from 'vee-validate';
import type { APICode, APIMoney } from './api.types';
import type { Pinia } from 'pinia';
import type { Router } from 'vue-router';
import type { GoodsDisplaySalesStatusCode } from '@/constants/shop-constants';

// #region Context
export interface VueContext {
  store?: Pinia;
  router: Router;
}
// #endregion

// #region Component
export interface CustomEmit<T> {
  (event: T): void;
  (event: T, ...args: any): void;
  (event: any): void;
  (event: any, ...args: any): void;
}
// #endregion

// #region Form
export type InputModel<T = string> = T;
export type RadioModel<T = string> = T extends boolean ? boolean : APICode<T> | null;
export type CheckboxModel<T = boolean> = T extends boolean ? boolean : T[];
// #endregion

// #region vee-validate 커스텀
export type ValidationSchema<TForm> = {
  [K in keyof Partial<TForm>]: K extends keyof Partial<TForm> ? RuleExpression<TForm[K]> : never;
};
// #endregion

// #region Goods
interface Badge {
  badgeId: number;
  text: string;
}

interface Option {
  name: string;
  value: string;
}
export interface Goods {
  /** 상품 PK */
  goodsId: number;
  /** 상품명 */
  displayGoodsName: string;
  /** 브랜드명 */
  brandName: string;
  /** 이미지 */
  imagePath: string;
  /** 원가 */
  originPrice: APIMoney | null;
  /** 판매가 */
  salePrice: APIMoney;
  /** 할인율 */
  discountRate: number;
  /** 판매상태 코드 */
  displaySaleStatusEnum: APICode<GoodsDisplaySalesStatusCode>;
  /** 재고 */
  saleStock: number;
  /** 뱃지 */
  badgeList?: Badge[];
  /** 관심상품 여부 */
  isWish: boolean;
  /** 옵션 */
  options?: Option[];
  /** 구매 갯수 */
  buyCnt?: number;
}
// #endregion
