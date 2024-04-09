import { toRefs, computed, type PropType } from 'vue';
import { type CustomEmit } from '@/types/common.types';
import type { Colors, Sizes } from '@/constants/ui-constants';
import type { APIMoney } from '@/types/api.types';
import { currencySymbols } from '@/configs/unit.config';

type Emits = '';

interface Props {
  money: APIMoney;
  color: Colors;
  size: Sizes;
  useUnit: boolean;
}
const emits: Emits[] = [''];

const props = {
  money: {
    type: Object as PropType<Props['money']>,
    default: () => ({}),
  },
  size: {
    type: String as PropType<Props['size']>,
    default: 'm',
  },
  color: {
    type: String as PropType<Props['color']>,
    default: 'black',
  },
  /** 단위 사용여부 [goods-type cart|order] */
  useUnit: {
    type: Boolean as PropType<Props['useUnit']>,
    default: false,
  },
};

export default function priceComposable(emit: CustomEmit<Emits>, props: Props) {
  const { money } = toRefs(props);

  const currencyUnit = computed(() => {
    return currencySymbols[money.value.currencyCode];
  });

  const priceFormat = computed(() => {
    return {
      unit: currencyUnit.value?.unit ?? '원',
      price: new Intl.NumberFormat(currencyUnit.value?.languageCode).format(money.value.number) ?? '0',
      unitDir: currencyUnit.value?.dir ?? 'back',
    };
  });

  return { priceFormat };
}

export { props as priceProps, emits as priceEmits };
