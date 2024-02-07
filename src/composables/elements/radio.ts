import { type PropType, computed, ref, toRefs, useAttrs, watch } from 'vue';
import { isEqual } from 'lodash-es';
import type { Colors } from '@/constants/ui-constants';
import type { CustomEmit, RadioModel } from '@/types/common.types';

type Emits = 'update:modelValue';

interface Props {
  modelValue: RadioModel<any>;
  value: RadioModel<any>;
  name: string;
  color: Colors;
  bgColor: Colors;
  textOnly: boolean;
  beforeUpdate?: (value?: RadioModel<any>) => boolean | Promise<boolean>;
}

const emits: Emits[] = ['update:modelValue'];

const props = {
  /** 입력 값 */
  modelValue: {
    type: [Boolean, String, Number, Object, null] as PropType<Props['modelValue']>,
    required: true as const,
  },
  /** 이전 값 */
  value: {
    type: [Boolean, String, Number, Object, null] as PropType<Props['value']>,
    required: true as const,
  },
  /** name (vee-validate에서 반드시 필요한 속성) */
  name: {
    type: String as PropType<Props['name']>,
    required: true as const,
  },
  /** 텍스트 컬러 */
  color: {
    type: String as PropType<Props['color']>,
    default: 'black' as Colors,
  },
  /** 배경 컬러 */
  bgColor: {
    type: String as PropType<Props['bgColor']>,
    default: '' as Colors,
  },
  /** 텍스트만 노출하는지 여부 */
  textOnly: {
    type: Boolean as PropType<Props['textOnly']>,
    default: false,
    required: false,
  },
  /** 값이 업데이트 되기 전에 실행할 함수 */
  beforeUpdate: {
    type: Function as PropType<Props['beforeUpdate']>,
    default: undefined,
  },
};

export default function radioComposable(emits: CustomEmit<Emits>, props: Props) {
  const { value, modelValue } = toRefs(props);

  const refRadio = ref<HTMLInputElement>();
  const attrs = useAttrs();

  const isChecked = computed(() => isEqual(value.value, modelValue.value));

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

  // 값 변경(클릭) 이벤트
  const handleClick = async (event: Event) => {
    let isPass = true;

    if (typeof props.beforeUpdate === 'function') {
      // 전달할 함수가 있으면 기본 동작 잠시 홀딩
      event.preventDefault();

      // 함수 실행 후 boolean return 받음
      isPass = await props.beforeUpdate(value.value);
    }

    if (isPass === true) {
      emits('update:modelValue', value.value);
    }
  };

  /**
   * TODO: 탭 컴포넌트 변경시 tick이 바뀌지 않으면 감지 못하는 이슈로 인해 setTimeout 걸어놓음
   */
  watch(
    () => modelValue.value,
    () => {
      setTimeout(() => {
        if (refRadio.value) {
          refRadio.value.checked = isChecked.value;
        }
      }, 0);
    },
  );

  return {
    refRadio,

    isChecked,
    styleAttrs,
    inputAttrs,

    handleClick,
  };
}

export { emits as radioEmits, props as radioProps };

export type { Emits as FbRadioEmits, Props as FbRadioProps };
