// NOTI: component default set
import { type PropType } from 'vue';

type Emits = '';

interface Props {
  propsName?: any;
}

const emits: Emits[] = [''];

const props = {
  propsName: {
    type: [] as PropType<Props['propsName']>,
    default: null,
  },
};

export default function formRowComposable() {
  return {};
}

export { props as formRowProps, emits as formRowEmits };

export type { Props as FormRowProps, Emits as FormRowEmits };
