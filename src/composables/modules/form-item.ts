import { type PropType, useSlots } from 'vue';

type Emits = '';

interface Props {
  title: string;
  required: boolean;
  useSubContents: boolean;
  hideTitle: boolean;
}

const emits: Emits[] = [''];

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
  /** 서브 콘텐츠 사용여부 */
  useSubContents: {
    type: Boolean as PropType<Props['required']>,
    default: false,
  },
  /** 타이틀 생략 여부 */
  hideTitle: {
    type: Boolean as PropType<Props['hideTitle']>,
    default: false,
  },
};

export default function formItemComposable() {
  const slots = useSlots();
  return { slots };
}

export { props as formItemProps, emits as formItemEmits };

export type { Props as FormItemProps, Emits as FormItemEmits };
