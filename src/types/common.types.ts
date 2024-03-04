import type { RuleExpression } from 'vee-validate';
import type { APICode } from './api.types';

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
export type Option<T = string> = boolean | string | number | APICode<T>;
// TODO: [고민] Option 고정으로 받아줄건지 고민 필요, 관련 타입에러 모두 FIX
export type CheckboxModel<T = boolean> = T extends boolean ? boolean : T[];
export type RadioModel<T = boolean> = T extends boolean ? boolean | null : T | null;

// #endregion

// #region vee-validate 커스텀
export type ValidationSchema<TForm> = {
  [K in keyof Partial<TForm>]: K extends keyof Partial<TForm> ? RuleExpression<TForm[K]> : never;
};
// #endregion
