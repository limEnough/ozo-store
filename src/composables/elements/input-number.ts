import { type PropType, computed, ref, useAttrs, watch } from 'vue';
import type { CustomEmit } from '@/types/common.types';
import { addComma, isNumeric } from '@/utils/number';

type Emits = 'update:modelValue' | 'update:useComma';
const emits: Emits[] = ['update:modelValue', 'update:useComma'];

interface Props {
  modelValue: string | null;
  disabled: boolean;
  minLength?: number | string;
  maxLength?: number | string;
  useComma: boolean;
  useZero: boolean;
  isDecimalType: boolean;
  decimalIdx: number;
  useLengthCount: boolean;
  name: string;
  isError: boolean;
  errorMessage: string;
}

const props = {
  modelValue: {
    type: [String, null] as PropType<Props['modelValue']>,
    default: '0',
    required: true as const,
  },
  disabled: {
    type: Boolean as PropType<Props['disabled']>,
    default: false,
  },
  minLength: {
    type: [Number, String] as PropType<Props['minLength']>,
    required: false,
  },
  maxLength: {
    type: [Number, String] as PropType<Props['maxLength']>,
    required: false,
  },
  /** 콤마(,) 사용 여부 */
  useComma: {
    type: Boolean as PropType<Props['useComma']>,
    default: true,
  },
  /** 0 입력 가능여부 - 휴대폰 번호 입력시 사용 */
  useZero: {
    type: Boolean as PropType<Props['useZero']>,
    default: false,
  },
  /** 소수점 입력 가능 사용여부 */
  isDecimalType: {
    type: Boolean as PropType<Props['isDecimalType']>,
    default: false,
  },
  /** 소수점 자릿 수 */
  decimalIdx: {
    type: Number as PropType<Props['decimalIdx']>,
    default: 2,
  },
  useLengthCount: {
    type: Boolean as PropType<Props['useLengthCount']>,
    default: false,
  },
  // #region vee-validate
  /** name - vee-validate에서 반드시 필요한 속성 */
  name: {
    type: String as PropType<Props['name']>,
    default: '',
  },
  /** 검증 에러 여부 */
  isError: {
    type: Boolean as PropType<Props['isError']>,
    default: false,
  },
  /** 에러 메시지 */
  errorMessage: {
    type: String as PropType<Props['errorMessage']>,
    default: '',
  },
  // #endregion
};

export default function inputNumberComposable(emit: CustomEmit<Emits>, props: Props) {
  // #region attrs
  const attrs = useAttrs();

  const styleAttrs = computed(() => {
    if (attrs.class) return { class: attrs.class };
    else return {};
  });

  const inputNumberAttrs = computed(() => {
    if (attrs.class) return { ...attrs, class: '' };
    else return attrs;
  });
  // #endregion attrs

  // 화면 표시용 value
  const displayNumber = ref(props.useComma ? addComma(props.modelValue) : props.modelValue);

  // #region 이벤트
  const handleInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const isNumber = isNumeric(input.value);

    // 모든 자릿수가 0인지 체크
    const isAllZero = (value: string) => /^0+$/.test(value);

    // 휴대폰 번호 입력 케이스 제외 공통 케이스
    if (!props.useZero) {
      // 정수부 0 한개 초과하여 입력 불가
      if (isAllZero(input.value)) {
        input.value = input.value.slice(0, 1);
      }

      // 첫번째 자릿수가 0일때 . 아닌 다른 숫자 입력하면 앞에 있는 0 제거
      if (input.value[0] === '0' && !input.value.includes('.') && input.value.length > 1) {
        input.value = input.value.slice(1, input.value.length);
      }
    }

    // 소수점 케이스
    if (props.isDecimalType) {
      if (!isNumber) input.value = input.value.replace(/[^0-9.]/g, ''); // 숫자와 . 아니면 삭제

      // 소수점 아래 자릿수 제한
      const decimalLimit = props.decimalIdx;

      const [integer, decimal] = input.value.split('.');

      if (decimal && decimal.length > decimalLimit) {
        const sliceDecimal = decimal.slice(0, decimalLimit);
        input.value = [integer, sliceDecimal].join('.');
      }
    } else {
      // 정수 케이스
      if (!isNumber) input.value = input.value.replace(/\D/g, ''); // 비숫자 삭제

      if (!props.useZero && Number(input.value) === 0 && input.value.length >= 1) {
        input.value = input.value.slice(1); // 첫입력 0 삭제
      }
    }

    emit('update:modelValue', input.value);
    displayNumber.value = input.value;
  };

  const handleBlur = () => {
    if (!props.modelValue) {
      displayNumber.value = props.modelValue;

      return;
    }

    let formattedNumber: string = props.modelValue;

    if (props.useComma) {
      formattedNumber = addComma(props.modelValue);
    }

    displayNumber.value = formattedNumber;
  };

  const handleFocus = () => {
    if (!props.modelValue) return;
    const valueWithoutComma = props.modelValue.replace(/,/g, '');

    displayNumber.value = valueWithoutComma;
  };
  // #endregion 이벤트

  watch(
    () => props.modelValue,
    (newVal) => {
      // TODO: 데이터 업데이트 감시 필요 여부 확인
      // if (newVal !== displayNumber.value) {
      //   handleBlur();
      // }
    },
  );

  return {
    styleAttrs,
    inputNumberAttrs,

    displayNumber,

    handleInput,
    handleBlur,
    handleFocus,
  };
}

export { emits as InputNumberEmits, props as InputNumberProps };
