import { type PropType, computed } from 'vue';
import { type CustomEmit } from '@/types/common.types';
import { type APICode } from '@/types/api.types';

interface Row extends APICode<null | string> {
  disabled?: boolean;
  // placeholder 역할의 옵션일 경우 true
  isPlaceholder?: boolean;
}

type Rows = Row[];

type Emits = 'update:modelValue' | 'selected';

interface Props {
  modelValue: Row | null;
  rows?: Rows;
  size?: 's' | 'm' | 'l';
  readonly?: boolean;
  hideDisabledText?: boolean;
  defaultOptionText: string;
}

const emits: Emits[] = ['update:modelValue', 'selected'];

const props = {
  modelValue: {
    type: [Object, null] as PropType<Props['modelValue']>,
    required: true,
  },
  rows: {
    type: Array as PropType<Props['rows']>,
    require: true,
  },
  size: {
    type: String as PropType<Props['size']>,
    default: 'l',
  },
  readonly: {
    type: Boolean as PropType<Props['readonly']>,
    default: false,
  },
  /** disabled 옵션 앞에 붙는 텍스트 숨김 여부 */
  hideDisabledText: {
    type: Boolean as PropType<Props['hideDisabledText']>,
    default: false,
  },
};

export default function selectboxComposable(emit: CustomEmit<Emits>, props: Props) {
  const model = computed({
    get: () => props.modelValue,
    set: (value) => {
      emit('update:modelValue', value);
      emit('selected', value);
    },
  });

  return { model };
}

export const makePlaceholder = (defaultOptionText: string): Row => {
  return { code: null, codeName: defaultOptionText, isPlaceholder: true };
};

export { props as selectboxProps, emits as selectboxEmits };
export type { Row as selectboxRow };
