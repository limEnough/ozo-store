import type { RuleExpression } from 'vee-validate';

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

export type CheckboxModel<T = boolean> = T extends boolean ? boolean : T[];

export type RadioModel<T = boolean> = T extends boolean ? boolean | null : T | null;
// #endregion

// #region vee-validate 커스텀
export type ValidationSchema<TForm> = {
  [K in keyof Partial<TForm>]: K extends keyof Partial<TForm> ? RuleExpression<TForm[K]> : never;
};
// #endregion
