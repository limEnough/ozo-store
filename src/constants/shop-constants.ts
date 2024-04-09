/** 노출 상품 판매상태 */
const GOODS_DISPLAY_SALES_STATUS_CODE = {
  /** 판매대기 */
  WAIT: 'GOODS.DISPLAY_SALE_STATUS.WAIT',
  /** 판매증 */
  SALE: 'GOODS.DISPLAY_SALE_STATUS.SALE',
  /** 품절 */
  OUT_OF_STOCK: 'GOODS.DISPLAY_SALE_STATUS.OUT_OF_STOCK',
  /** 판매중지 */
  STOP: 'GOODS.DISPLAY_SALE_STATUS.STOP',
} as const;

type GoodsDisplaySalesStatusCode =
  (typeof GOODS_DISPLAY_SALES_STATUS_CODE)[keyof typeof GOODS_DISPLAY_SALES_STATUS_CODE];

export { GOODS_DISPLAY_SALES_STATUS_CODE };
export type { GoodsDisplaySalesStatusCode };
