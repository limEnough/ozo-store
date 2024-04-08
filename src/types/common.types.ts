import type { RuleExpression } from 'vee-validate';
import type { APICode } from './api.types';
import type { Pinia } from 'pinia';
import type { Router } from 'vue-router';

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
export interface CheckboxGroupOption<T = string | boolean> extends APICode<T> {
  disabled?: boolean;
  required?: boolean;
  link?: string;
}

export type InputModel<T = string> = T;
export type RadioModel<T = string> = boolean | string | number | APICode<T> | null;
export type CheckboxModel<T = boolean> = T;
export type CheckboxGroupModel<T = string | boolean> = CheckboxGroupOption<T>[];

// #endregion

// #region vee-validate 커스텀
export type ValidationSchema<TForm> = {
  [K in keyof Partial<TForm>]: K extends keyof Partial<TForm> ? RuleExpression<TForm[K]> : never;
};
// #endregion
