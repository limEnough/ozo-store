import { computed, ref, toRefs, useAttrs } from 'vue';
import type { PropType } from 'vue';
import type { CountType } from '@/utils/string';
import type { InputStates } from '@/constants/ui-constants';
import type { CustomEmit, InputModel } from '@/types/common.types';

type Emits = 'update:modelValue' | 'search';
type Charset = 'utf-8' | 'euc-kr' | string;

interface Props {
  modelValue: InputModel | null;
  disabled: boolean;
  required: boolean;
  minlength: number | string;
  maxlength: number | string;
  clearable: boolean;
  isSearch: boolean;
  name: string;
  state: InputStates;
  useLengthCount: boolean;
  countType: CountType;
  charset?: Charset;
  allowedRegex: RegExp | null;
  visible: boolean;
  label: string;
  isCardType: boolean;
  noLabel: boolean;
}

const emits: Emits[] = ['update:modelValue', 'search'];

const defaultValue = Symbol();

const props = {
  /** 입력값 */
  modelValue: {
    type: [Number, String, Number, Symbol, null] as PropType<Props['modelValue']>,
    default: defaultValue,
    required: true as const,
  },
  /** 입력값 */
  label: {
    type: String as PropType<Props['label']>,
    default: defaultValue,
    required: true as const,
  },
  /** 비활성화 여부 */
  disabled: {
    type: Boolean as PropType<Props['disabled']>,
    default: false,
  },
  /** 필수 여부 */
  required: {
    type: Boolean as PropType<Props['required']>,
    default: false,
  },
  /** length 최솟값 */
  minlength: {
    type: [String, Number] as PropType<Props['minlength']>,
    default: 0,
  },
  /** length 최댓값 */
  maxlength: {
    type: [String, Number] as PropType<Props['maxlength']>,
    default: 20,
  },
  /** input reset 사용 여부 */
  clearable: {
    type: Boolean as PropType<Props['clearable']>,
    default: false,
  },
  /** 카운트할 타입 (byte | 텍스트 길이) */
  countType: {
    type: String as PropType<Props['countType']>,
    default: 'count',
  },
  /** 인코딩 문자 */
  charset: {
    type: String as PropType<Props['charset']>,
    default: 'utf-8',
  },
  /** 겸색 영역인지 여부 */
  isSearch: {
    type: Boolean as PropType<Props['isSearch']>,
    default: false,
  },
  /** 글자수 카운트 사용여부 */
  useLengthCount: {
    type: Boolean as PropType<Props['useLengthCount']>,
    default: true,
  },
  /** name (vee-validate에서 반드시 필요한 속성) */
  name: {
    type: String as PropType<Props['name']>,
    default: '',
  },
  /** input 상태 */
  state: {
    type: String as PropType<Props['state']>,
    default: '',
  },
  /** 입력 허용 문자 정규식 */
  allowedRegex: {
    type: [RegExp, null] as PropType<Props['allowedRegex']>,
    default: () => null,
  },
  /** 비밀번호 보기 */
  visible: {
    type: Boolean as PropType<Props['visible']>,
    default: false,
  },
  /** 카드타입 여부 */
  isCardType: {
    type: Boolean as PropType<Props['isCardType']>,
    default: false,
  },
  /** 라벨 사용 안함 여부 */
  noLabel: {
    type: Boolean as PropType<Props['noLabel']>,
    default: false,
  },
};

export default function inputComposables(emit: CustomEmit<Emits>, props: Props) {
  const { countType, maxlength, state } = toRefs(props);

  const attrs = useAttrs();

  const inputType = computed(() => (attrs.type as string) ?? 'text');

  const controlType = ref(inputType.value);

  const inputElement = ref<HTMLInputElement>();

  const modelValueTextLength = computed(() => (props.modelValue ? props.modelValue.toString().length : 0));

  const isFail = computed(() => 'fail' === state.value);
  const isSuccess = computed(() => 'success' === state.value);
  const isFocus = ref(false);

  // #region attrs
  const styleAttrs = computed(() => {
    if (attrs.class) return { class: attrs.class };
    else return {};
  });

  const inputAttrs = computed(() => {
    if (attrs.class) return { ...attrs, class: '' };
    else return attrs;
  });
  // #endregion

  const inputBindings = computed(() => {
    return {
      ...inputAttrs.value,
      ...(countType.value === 'count' && { maxlength: maxlength.value }),
    };
  });

  /** 외부로 내보낼 속성 */
  const getExposeProperties = () => {
    return {
      inputElement,
      focus,
    };
  };

  const handleSearch = (value: string) => {
    emit('search', value);
  };

  const handleInputClear = () => {
    emit('update:modelValue', '');

    isFocus.value = false;
    inputElement.value?.focus();
  };

  const handleFocus = async () => {
    // ..
  };

  const handleBlur = () => {
    isFocus.value = false;
  };

  // #region vee-validate 내장 속성들
  const inputValue = computed(() => props.modelValue);

  /** 입력 불가능 문자가 있을 경우 필터링해서 반환 */
  const sanitizeInputValue = (value: string, allowedRegex: Props['allowedRegex']): string => {
    if (allowedRegex === null) {
      return value;
    }

    if (!(allowedRegex instanceof RegExp)) {
      return value;
    }

    return value.replace(allowedRegex, '');
  };

  /** byte 타입 사용 여부 */
  const isByteType = computed(() => {
    return countType.value === 'byte';
  });

  /**
   * input 이벤트 핸들링 함수
   * 마지막으로 유효했던 값을 저장하기 위한 변수
   */
  const lastValidValue = ref(props.modelValue ?? '');

  const handleInput = (e: Event) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }

    const { value } = e.target;

    // 허용된 정규식 기준으로 입력 불가능 문자 필터링
    const sanitizedValue = sanitizeInputValue(value, props.allowedRegex);

    // 새로운 값의 길이가 maxlength를 초과하는지 확인
    if (sanitizedValue.length > Number(props.maxlength)) {
      e.target.value = lastValidValue.value; // 이전 유효값으로 재설정
      const maxLengthLimitedValue = lastValidValue.value.toString().slice(0, Number(props.maxlength));

      e.target.value = maxLengthLimitedValue;

      emit('update:modelValue', maxLengthLimitedValue);

      return;
    }

    lastValidValue.value = sanitizedValue; // 유효한 값으로 업데이트

    e.target.value = sanitizedValue;

    emit('update:modelValue', sanitizedValue);
  };

  // #endregion

  // input type text toggle
  const handleInputVisible = () => {
    if (inputType.value === controlType.value) {
      controlType.value = 'text';
    } else {
      controlType.value = inputType.value;
    }
  };

  const focus = () => {
    inputElement.value?.focus();
  };

  return {
    styleAttrs,
    inputBindings,
    isFail,
    isSuccess,
    isFocus,

    inputElement,

    modelValueTextLength,
    getExposeProperties,

    handleInputClear,
    handleSearch,
    handleInputVisible,
    handleFocus,
    handleBlur,

    // field
    inputValue,
    handleInput,
    inputType,
    controlType,
  };
}

export { emits as inputEmits, props as inputProps };
