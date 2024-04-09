/** 클레임 타입 코드 */
const ORDER_CLAIM_CODE = {
  CANCEL: 'ORDER.CLAIM_TYPE.CANCEL',
  EXCHANGE: 'ORDER.CLAIM_TYPE.EXCHANGE',
  RETURN: 'ORDER.CLAIM_TYPE.RETURN',
  DEPOSIT_CANCEL: 'ORDER.CLAIM_TYPE.DEPOSIT_CANCEL',
} as const;

type OrderClaimCode = (typeof ORDER_CLAIM_CODE)[keyof typeof ORDER_CLAIM_CODE];

export { ORDER_CLAIM_CODE };

export type { OrderClaimCode };
