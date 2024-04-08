import { type PropType, toRefs, computed, useSlots } from 'vue';
import { type CheckboxModel, type CustomEmit } from '@/types/common.types';
import { v4 as uuidV4 } from 'uuid';
import type { APICode } from '@/types/api.types';
import type { CheckboxProps } from '@/composables/elements/checkbox';

type Emits = 'update:modelValue';

interface CheckboxGroupOption<T = string> extends APICode<T> {
  disabled?: boolean;
  required?: boolean;
  link?: string;
}

type PropsOmitKeys = 'modelValue' | 'value';

interface Props extends Omit<CheckboxProps, PropsOmitKeys> {
  modelValue: CheckboxModel<CheckboxGroupOption>;
  value: CheckboxModel<CheckboxGroupOption>;
  useFrontLabelText: boolean;
  options: CheckboxGroupOption[];
  labelKey: string;
  useAllOption: boolean;
  isError: boolean;
  errorMessage: string;
}

const emits: Emits[] = ['update:modelValue'];

const props = {
  modelValue: {
    type: Array as PropType<Props['modelValue']>,
    required: true as const,
  },
  name: {
    type: String as PropType<Props['name']>,
    required: true as const,
  },
  value: {
    type: Object as PropType<Props['value']>,
    default: null,
  },
  disabled: {
    type: Boolean as PropType<Props['disabled']>,
    default: false,
  },
  /** 라벨 앞에 붙는 텍스트 사용 여부 */
  useFrontLabelText: {
    type: Boolean as PropType<Props['useFrontLabelText']>,
    default: false,
  },
  /** 옵션 */
  options: {
    type: Array as PropType<Props['options']>,
    required: true as const,
  },
  /** label로 노출할 key 값 */
  labelKey: {
    type: String as PropType<Props['labelKey']>,
    default: 'codeName',
  },
  /** 전체 선택 사용 여부 */
  useAllOption: {
    type: Boolean as PropType<Props['useAllOption']>,
    default: false,
  },
  /** 타입 */
  type: {
    type: String as PropType<Props['type']>,
    default: 'basic',
  },
  // #region vee-validate
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

export default function checkboxGroupComposable(emit: CustomEmit<Emits>, props: Props) {
  const { labelKey, options } = toRefs(props);
  const slots = useSlots();

  // 각 옵션마다 고유한 name 을 부여하기 위해 사용
  const uuid = uuidV4();

  const model = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit('update:modelValue', value);
    },
  });

  // checkbox 텍스트에 매핑할 값 반환
  const getLabel = (option: CheckboxGroupOption) => {
    return option[labelKey.value];
  };

  // checkbox value에 매핑할 값 반환
  const getValue = (option: CheckboxGroupOption) => {
    return option;
  };

  // 비활성화 할 옵션인지 체크
  const isDisabledOption = (option: CheckboxGroupOption) => {
    return option.disabled;
  };

  // 필수 옵션인지 체크
  const isRequiredOption = (option: CheckboxGroupOption) => {
    return option.required ?? false;
  };

  // 전체 옵션 비활성화 여부 (모든 옵션 비활성화일 경우)
  const isAllDisabled = computed(() => {
    return options.value.every((option) => {
      return option.disabled;
    });
  });

  // 선택된 옵션들의 값 TODO: 필요한 값인지 확인필요
  const optionValues = computed(() => options.value.map((option) => getValue(option)));

  // 전체 선택 여부
  const isAllChecked = computed({
    get() {
      const optionLength = optionValues.value.length;
      const modelLength = model.value.length;

      if (!optionLength || !modelLength) {
        return false;
      }

      return optionLength === modelLength;
    },
    set(checked: boolean) {
      if (checked) {
        model.value = optionValues.value.slice();

        return;
      }

      model.value = [];
    },
  });

  return {
    uuid,
    slots,
    model,
    isAllChecked,
    isDisabledOption,
    isAllDisabled,
    isRequiredOption,
    getLabel,
    getValue,
  };
}

export { props as checkboxGroupProps, emits as checkboxGroupEmits };
export type { CheckboxGroupOption };
