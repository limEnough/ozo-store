/**
 * object type 여부 반환
 *
 * @param value
 * @returns
 */
export const isObject = (value: unknown): value is object => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};
