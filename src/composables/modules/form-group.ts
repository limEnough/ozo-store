import { type PropType, computed, useSlots } from 'vue';
import { type CustomEmit } from '@/types/common.types';

type Emits = 'update:is-open';

interface Props {
  title: string;
  required: boolean;
  useTitle: boolean;
  useAccordion: boolean;
  hasDepth: boolean;
  isOpen: boolean;
  isInnerGroup: boolean;
}

const emits: Emits[] = ['update:is-open'];

const props = {
  /** 타이틀 */
  title: {
    type: String as PropType<Props['title']>,
    default: '',
  },
  /** 필수값 여부 */
  required: {
    type: Boolean as PropType<Props['required']>,
    default: false,
  },
  /** 타이틀 영역 사용 여부 */
  useTitle: {
    type: Boolean as PropType<Props['useTitle']>,
    default: false,
  },
  /** 아코디언 사용 여부 */
  useAccordion: {
    type: Boolean as PropType<Props['useAccordion']>,
    default: true,
  },
  /** 뎁스형태 사용 여부 */
  hasDepth: {
    type: Boolean as PropType<Props['hasDepth']>,
    default: false,
  },
  /** 아코디언 오픈 여부 */
  isOpen: {
    type: Boolean as PropType<Props['isOpen']>,
    default: true,
  },
  /** 이너 폼그룹 여부 (form-group > form-group) */
  isInnerGroup: {
    type: Boolean as PropType<Props['isInnerGroup']>,
    default: false,
  },
};

export default function formGroupComposable(emit: CustomEmit<Emits>) {
  const slots = useSlots();

  const hasSlotHeader = computed(() => !!slots.title);
  const hasSlotGuide = computed(() => !!slots.guide);

  const handleToggle = (isOpen: boolean) => {
    emit('update:is-open', isOpen);
  };

  return { hasSlotHeader, hasSlotGuide, handleToggle, slots };
}

export { props as formGroupProps, emits as formGroupEmits };

export type { Props as FormGroupProps, Emits as FormGroupEmits };
