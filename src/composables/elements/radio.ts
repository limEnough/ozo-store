import { type PropType, computed, ref, toRefs, useAttrs } from 'vue';
import { isEqual } from 'lodash-es';
import type { CustomEmit, RadioModel } from '@/types/common.types';
import { v4 as uuidV4 } from 'uuid';
import { isObject } from '@/utils/object';

type Emits = 'update:modelValue';

type RadioType = 'basic' | 'card' | 'text';

interface Props {
  modelValue: RadioModel;
  name: string;
  type: RadioType;
  options: RadioModel[];
  disabled: boolean;
  disableOptions: RadioModel[];
  labelKey: string;
  valueKey: string;
  beforeUpdate?: (value?: RadioModel) => boolean | Promise<boolean>;
}

const emits: Emits[] = ['update:modelValue'];

const props = {
  /** 입력 값 */
  modelValue: {
    type: [Boolean, String, Object, null] as PropType<Props['modelValue']>,
    required: true as const,
  },
  /** 타입 */
  type: {
    type: String as PropType<Props['type']>,
    default: 'basic',
  },
  /** 옵션 */
  options: {
    type: Array as PropType<Props['options']>,
    required: true as const,
  },
  /** 전체 비활성화 여부 */
  disabled: {
    type: Boolean as PropType<Props['disabled']>,
    default: false,
  },
  /** 비활성화 옵션 */
  disableOptions: {
    type: Array as PropType<Props['disableOptions']>,
    default: () => [],
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
  /** name (vee-validate에서 반드시 필요한 속성) */
  name: {
    type: String as PropType<Props['name']>,
    required: true as const,
  },
  /** 값이 업데이트 되기 전에 실행할 함수 */
  beforeUpdate: {
    type: Function as PropType<Props['beforeUpdate']>,
    default: undefined,
  },
};

export default function radioComposable(emits: CustomEmit<Emits>, props: Props) {
  const { modelValue, disableOptions, labelKey, valueKey, options } = toRefs(props);

  // 각 옵션마다 고유한 name 을 부여하기 위해 사용
  const uuid = uuidV4();

  // 라디오 Html element
  const refRadio = ref<HTMLInputElement>();

  // 값 변경 전 저장소
  const restrictedValue = ref(modelValue.value);

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

  // radio 텍스트에 매핑할 값 반환
  const getLabel = (option: RadioModel) => {
    if (isObject(option)) {
      return option[labelKey.value] ?? option;
    }

    return option;
  };

  // radio value에 매핑할 값 반환
  const getValue = (option: RadioModel) => {
    if (isObject(option)) return option[valueKey.value];
    else return option;
  };

  // 해당 옵션 checked 여부 반환
  const getChecked = (option: RadioModel) => {
    return isEqual(restrictedValue.value, option);
  };

  // 비활성화 할 옵션인지 확인
  const isDisabledOption = (option: RadioModel) => {
    return disableOptions.value.includes(getValue(option));
  };

  // 값 변경(클릭) 이벤트
  const handleClick = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    let isPass = true;

    if (typeof props.beforeUpdate === 'function') {
      // 전달할 함수가 있으면 기본 동작 잠시 홀딩
      event.preventDefault();

      // 함수 실행 후 boolean return 받음
      isPass = await props.beforeUpdate(restrictedValue.value);
    }

    if (isPass === true) {
      // value 업데이트
      restrictedValue.value = options.value.find((option) => {
        if (isObject(option)) return option.code === target.value;
        else return option === target.value;
      });

      emits('update:modelValue', restrictedValue.value);
    }
  };

  return {
    refRadio,
    styleAttrs,
    functionalAttrs,

    uuid,

    getValue,
    getLabel,
    getChecked,
    isDisabledOption,

    handleClick,
  };
}

export { emits as radioEmits, props as radioProps };

export type { Emits as FbRadioEmits, Props as FbRadioProps };
