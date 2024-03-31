import { type PropType } from 'vue';
import { type CustomEmit } from '@/types/common.types';

type Emits = '';

interface Props {
  propsName: '';
}

const emits: Emits[] = [''];

const props = {
  propsName: {
    type: String as PropType<Props['propsName']>,
    default: '',
  },
};

export default function goodsComposable(emit: CustomEmit<Emits>, props: Props) {
  return {};
}

export { props as goodsProps, emits as goodsEmits };
