import { computed, toRefs, type PropType } from 'vue';
import { type CustomEmit, type Goods } from '@/types/common.types';
import { GOODS_DISPLAY_SALES_STATUS_CODE } from '@/constants/shop-constants';

// TODO: 29cm 참고해서 card 타입 추가하기
type Type = 'list' | 'order' | 'cart' | 'slide';
type state = 'sale' | 'out' | 'stop';

interface ClassMapping {
  [key: string]: string;
}

type Emits = '';

interface Props {
  goods: Goods;
  type: Type;
  state: state;
  link: string;
  useLink: boolean;
  openOnNewTab: boolean;
  hideWish: boolean;
}

const emits: Emits[] = [''];

const props = {
  goods: {
    type: Object as PropType<Props['goods']>,
    required: true as const,
  },
  type: {
    type: String as PropType<Props['type']>,
    default: 'list',
  },
  state: {
    type: String as PropType<Props['state']>,
    default: 'sale',
  },
  /** 상품상세 말고 다른 링크로 설정하고 싶을 경우 */
  link: {
    type: String as PropType<Props['link']>,
    default: '',
  },
  /** 링크 사용여부 */
  useLink: {
    type: Boolean as PropType<Props['useLink']>,
    default: true,
  },
  /** 링크 선택 시 새 탭으로 열지 여부 */
  openOnNewTab: {
    type: Boolean as PropType<Props['openOnNewTab']>,
    default: false,
  },
  /** wish 버튼 숨김 여부 */
  hideWish: {
    type: Boolean as PropType<Props['hideWish']>,
    default: false,
  },
};

export default function goodsComposable(emit: CustomEmit<Emits>, props: Props) {
  const { type: typeProp, state, goods } = toRefs(props);

  // #region Props control
  const mapClasses = (mapping: ClassMapping, propValue: string) => {
    return Object.fromEntries(Object.entries(mapping).map(([key, value]) => [value, key === propValue]));
  };

  const goodsClasses = computed(() => {
    const typeClasses = mapClasses(
      {
        list: 'type--list',
        order: 'type--order',
        cart: 'type--cart',
        slide: 'type--slide',
      },
      typeProp.value,
    );

    const stateClasses = mapClasses(
      {
        out: 'state--out',
        stop: 'state--stop',
      },
      state.value,
    );

    return {
      ...typeClasses,
      ...stateClasses,
    };
  });

  /** 상품정보 URL 생성 */
  const makeGoodsURL = (goods: Goods) => {
    return `goodsView/${goods.goodsId}`;
  };

  /** 상품정보 URL */
  const url = computed(() => {
    const { link, goods } = props;

    // props로 전달받은 link가 있으면 link 우선 적용
    if (link) return link;

    return goods.goodsId ? makeGoodsURL(goods) : '#';
  });

  /** URL 가지고 있는지 여부 */
  const hasUrl = computed(() => {
    const { useLink } = props;

    return useLink && url.value !== '#';
  });

  /** type order 여부 */
  const isTypeOrder = computed(() => {
    return typeProp.value === 'order';
  });

  /** type cart 여부 */
  const isTypeCart = computed(() => {
    return typeProp.value === 'cart';
  });

  /** discount 여부 */
  const isDiscount = computed(() => {
    return goods.value.discountRate > 0 && goods.value.originPrice;
  });

  /** 품절 여부 */
  const isSoldOut = computed(() => {
    return goods.value.displaySaleStatusEnum.code === GOODS_DISPLAY_SALES_STATUS_CODE['OUT_OF_STOCK'];
  });

  /** 판매 중지 여부 */
  const isSoldStop = computed(() => {
    return goods.value.displaySaleStatusEnum.code === GOODS_DISPLAY_SALES_STATUS_CODE['STOP'];
  });
  // #endregion

  // #region Data
  // #endregion

  // #region Events
  /** 관심상품 등록 및 해제 이벤트 */
  const handleToggleWish = (e: Event) => {
    e.preventDefault();

    console.log('관심상품 등록 및 해제 이벤트 개발중');
  };
  // #endregion

  return {
    goodsClasses,
    hasUrl,
    url,
    isTypeOrder,
    isTypeCart,
    isDiscount,
    isSoldOut,
    isSoldStop,
    handleToggleWish,
  };
}

export { props as goodsProps, emits as goodsEmits };
