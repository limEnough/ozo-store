import { computed } from 'vue';
import { type FieldOptions, type RuleExpression, useField } from 'vee-validate';
import type { ValidationSchema } from '@/types/common.types';

// form input 필드에 추가적으로 바인딩할 데이터
interface AdditionalOptions {
  required?: boolean;
  min?: number;
  max?: number;
  placeholder?: string;
  /** input component allowed-regex와 매핑되는 입력 허용 정규식 */
  regex?: RegExp;
}

export default function createCustomField<TValue = unknown>(
  name: string,
  rules?: RuleExpression<TValue>,
  opts?: Partial<FieldOptions<TValue>>,
  additional?: AdditionalOptions,
) {
  const field = useField(name, rules, {
    // NOTI: 모델이 업데이트 될 때마다 유효성 검사하는 옵션 비활성화
    // 각 필드 포커스 아웃 시 검증하기 위해 blur 이벤트를 추가 후 validate 함수 실행 필요!
    validateOnValueUpdate: false,
    ...opts,
  });

  // vee-validate 필드 검증이 한 번이라도 업데이트 되었는지 여부 반환
  const isDirty = computed(() => {
    const { meta } = field;

    return meta.dirty;
  });

  // vee-validate 필드 검증이 한 번이라도 실행되었는지 여부 반환
  const isValidated = computed(() => {
    const { meta } = field;

    return meta.validated;
  });

  // vee-validate 필드 검증 성공 여부 반환
  const isSuccess = computed(() => {
    const {
      errors,
      meta: { validated, dirty },
    } = field;

    return dirty && validated && errors.value.length === 0;
  });

  // vee-validate 필드 검증 실패 여부 반환
  const isError = computed(() => {
    const { errors, meta } = field;

    return meta.validated && errors.value.length > 0;
  });

  // vee-validate 필드 검증 실패 시 에러메시지 반환
  // TODO: [고민] string[]으로 받아야 할지 고민 필요
  const errorMessage = computed(() => field.errorMessage.value ?? '');

  return {
    // #region 필드 정보
    field,
    name: field.name,
    value: field.value,
    resetField: field.resetField,
    validate: field.validate,
    // #endregion

    // #region 검사 관련
    isValidated,
    isDirty,
    isSuccess,
    isError,
    errorMessage,
    // #endregion

    // #region 필드 추가 정보
    ...additional,
    // #endregion
  };
}

export const createValidationSchema = <TForm>(schema: ValidationSchema<TForm>): ValidationSchema<TForm> => {
  return schema;
};
