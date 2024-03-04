import { type PropType, toRefs, computed, useAttrs, useSlots } from 'vue';
import { type CheckboxModel, type CustomEmit } from '@/types/common.types';
import { v4 as uuidV4 } from 'uuid';
import { isObject } from 'lodash-es';
import type { APICode } from '@/types/api.types';

type Emits = 'update:modelValue';

interface CheckboxOption<T = string> extends APICode<T> {
  disabled?: boolean;
  required?: boolean;
  link?: string;
}

interface Props {
  modelValue: CheckboxModel<CheckboxOption>;
  name: string;
  value: CheckboxModel<CheckboxOption> | null;
  options: CheckboxModel<CheckboxOption>;
  disabled: boolean;
  labelKey: string;
  valueKey: string;
  useAllOption: boolean;
  type: 'basic' | 'box';
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
    type: [Boolean, Object, String, Number, null] as PropType<Props['value']>,
    default: null,
  },
  /** 옵션 */
  options: {
    type: Array as PropType<Props['options']>,
    required: true as const,
  },
  /** 비활성화 여부 */
  disabled: {
    type: Boolean as PropType<Props['disabled']>,
    default: false,
  },
  /** label로 노출할 key 값 */
  labelKey: {
    type: String as PropType<Props['labelKey']>,
    default: 'codeName',
  },
  /** value로 사용할 key 값 */
  valueKey: {
    type: String as PropType<Props['valueKey']>,
    default: 'code',
  },
  /** 전체 선택 사용 여부  */
  useAllOption: {
    type: Boolean as PropType<Props['useAllOption']>,
    default: false,
  },
  /** 타입  */
  type: {
    type: String as PropType<Props['type']>,
    default: 'basic',
  },
};

export default function checkboxComposable(emit: CustomEmit<Emits>, props: Props) {
  const { labelKey, valueKey, options } = toRefs(props);
  const slots = useSlots();

  // 각 옵션마다 고유한 name 을 부여하기 위해 사용
  const uuid = uuidV4();

  // #region attrs
  const attrs = useAttrs();

  const styleAttrs = computed(() => {
    if (attrs.class) return { class: attrs.class };
    else return {};
  });

  const functionalAttrs = computed(() => {
    if (attrs.class) return { ...attrs, class: '' };
    else return attrs;
  });
  // #endregion

  const model = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit('update:modelValue', value);
    },
  });

  // radio 텍스트에 매핑할 값 반환
  const getLabel = (option: CheckboxOption) => {
    if (isObject(option)) {
      return option[labelKey.value] ?? option;
    }

    return option;
  };

  // radio value에 매핑할 값 반환
  const getValue = (option: CheckboxOption) => {
    return option;
  };

  // 비활성화 할 옵션인지 체크
  const isDisabledOption = (option: CheckboxOption) => {
    return option.disabled;
  };

  // 필수 옵션인지 체크
  const isRequiredOption = (option: CheckboxOption) => {
    return option.required ?? false;
  };

  // 전체 옵션 비활성화 여부 (모든 옵션 비활성화일 경우)
  const isAllDisabled = computed(() => {
    return options.value.every((option) => {
      return option.disabled;
    });
  });

  // 전체 선택 체크박스
  const optionValues = computed(() => options.value.map((option) => getValue(option)));

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
    styleAttrs,
    functionalAttrs,
  };
}

export { props as checkboxProps, emits as checkboxEmits };
export type { CheckboxOption };
