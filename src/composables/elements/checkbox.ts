import { computed, useAttrs, type PropType } from 'vue';
import { type CheckboxModel, type CustomEmit } from '@/types/common.types';

type Emits = 'update:modelValue';

interface Props {
  modelValue: CheckboxModel<any>;
  name: string;
  value: boolean | object;
  disabled: boolean;
  type: 'basic' | 'box';
}

const emits: Emits[] = ['update:modelValue'];

const props = {
  modelValue: {
    type: [Array, Boolean] as PropType<Props['modelValue']>,
    required: true as const,
  },
  name: {
    type: String as PropType<Props['name']>,
    required: true as const,
  },
  value: {
    type: [Boolean, Object] as PropType<Props['value']>,
    default: null,
  },
  disabled: {
    type: Boolean as PropType<Props['disabled']>,
    default: false,
  },
  type: {
    type: String as PropType<Props['type']>,
    default: 'basic',
  },
};

export default function checkboxComposable(emit: CustomEmit<Emits>, props: Props) {
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

  return { styleAttrs, functionalAttrs, model };
}

export { props as checkboxProps, emits as checkboxEmits };
export type { Props as CheckboxProps };
