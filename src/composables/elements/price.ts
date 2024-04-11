import { toRefs, computed, type PropType } from 'vue';
import { type CustomEmit } from '@/types/common.types';
import type { APIMoney } from '@/types/api.types';
import { currencySymbols } from '@/configs/unit.config';
import type { GoodsType } from '@/composables/modules/goods';
import { mapClasses } from '@/utils/classes';

type Emits = '';

interface Props {
  money: APIMoney;
  useUnit: boolean;
  type: GoodsType;
}
const emits: Emits[] = [''];

const props = {
  money: {
    type: Object as PropType<Props['money']>,
    default: () => ({}),
  },
  type: {
    type: String as PropType<Props['type']>,
    default: 'list',
  },
  /** 단위 사용여부 [goods-type cart|order] */
  useUnit: {
    type: Boolean as PropType<Props['useUnit']>,
    default: false,
  },
};

export default function priceComposable(emit: CustomEmit<Emits>, props: Props) {
  const { type: typeProp, money } = toRefs(props);

  // #region Props class
  const priceClasses = computed(() => {
    const typeClasses = mapClasses(
      {
        list: 'type--list',
        order: 'type--order',
        card: 'type--card',
        cart: 'type--cart',
        slide: 'type--slide',
      },
      typeProp.value,
    );

    return {
      ...typeClasses,
    };
  });
  // #endregion

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

  return { priceFormat, priceClasses };
}

export { props as priceProps, emits as priceEmits };
