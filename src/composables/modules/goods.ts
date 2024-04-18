import { computed, toRefs, type PropType } from 'vue';
import { type CustomEmit } from '@/types/common.types';
import { GOODS_DISPLAY_SALES_STATUS_CODE, type GoodsDisplaySalesStatusCode } from '@/constants/shop-constants';
import { mapClasses } from '@/utils/classes';
import { useLayoutStore } from '@/stores/layout';
import { useI18n } from 'vue-i18n';
import type { APICode, APIMoney } from '@/types/api.types';
import { useRedirect } from '@/composables/use/use-redirect';
import { db } from '@/firebase';
import { getDoc, doc } from 'firebase/firestore';

type Type = 'list' | 'order' | 'cart' | 'card' | 'slide';

type Emits = '';

interface Badge {
  badgeId: number;
  text: string;
}

interface Option {
  name: string;
  value: string;
}
export interface Goods {
  /** 상품 PK */
  goodsId: number;
  /** 상품명 */
  displayGoodsName: string;
  /** 브랜드명 */
  brandName: string;
  /** 상품 설명 */
  displayGoodsDesc?: string;
  /** 이미지 */
  imagePath: string;
  /** 원가 */
  originPrice: APIMoney | null;
  /** 판매가 */
  salePrice: APIMoney;
  /** 할인율 */
  discountRate: number;
  /** 판매상태 코드 */
  displaySaleStatusEnum: APICode<GoodsDisplaySalesStatusCode>;
  /** 재고 */
  saleStock: number;
  /** 뱃지 */
  badgeList?: Badge[];
  /** 관심상품 여부 */
  isWish: boolean;
  /** 옵션 */
  options?: Option[];
  /** 구매 갯수 */
  buyCnt?: number;
}
interface WishModel {
  isWish: boolean;
  goodsId: Goods['goodsId'];
}

interface ToggleWishResult {
  isSuccess: boolean;
  isWish: WishModel['isWish'];
}

interface Props {
  goods: Goods;
  type: Type;
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

// TODO: wish 기능 구현중
const goodsExposeComposable = () => {
  /** [API] 관심상품 toggle */
  const patchToggleWish = async ({ goodsId, isWish }: WishModel) => {
    const response: ToggleWishResult = {
      isSuccess: false,
      isWish,
    };

    const docRef = doc(db, 'users', 'test@naver.com');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
    } else {
      console.log('No such document!');
    }

    // try {
    //   // await updateDoc(wishDoc, { age: age + 1 });
    // } catch (error) {
    //   console.error('patchToggleWish', error);
    //   return response;
    // }

    return response;
  };

  /** [EVENT] 관심상품 toggle */
  const toggleWish = async (goods: WishModel) => {
    alert('관심상품 등록 및 해제 api 연동 개발중입니다!\n조금만 기다려주세요!');
    // const response: ToggleWishResult = {
    //   isSuccess: false,
    //   isWish: false,
    // };

    // try {
    //   const result = await patchToggleWish(goods);

    //   response.isSuccess = result.isSuccess;
    //   response.isWish = result.isWish;
    // } catch (error) {
    //   console.error('toggleWish', error);
    //   return response;
    // }
  };

  return {
    toggleWish,
  };
};

export default function goodsComposable(emit: CustomEmit<Emits>, props: Props) {
  const { type: typeProp, goods } = toRefs(props);
  const { toggleWish: goodsToggleWish } = goodsExposeComposable();

  const messages = useI18n();
  const layoutStore = useLayoutStore();
  const { redirectToMain } = useRedirect();

  // #region Props class
  const goodsClasses = computed(() => {
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

  // #region Props type
  /** type order 여부 */
  const isTypeOrder = computed(() => {
    return typeProp.value === 'order';
  });

  /** type cart 여부 */
  const isTypeCart = computed(() => {
    return typeProp.value === 'cart';
  });

  /** type list 여부 */
  const isTypeList = computed(() => {
    return typeProp.value === 'list';
  });

  /** type card 여부 */
  const isTypeCard = computed(() => {
    return typeProp.value === 'card';
  });

  /** type slide 여부 */
  const isTypeSlide = computed(() => {
    return typeProp.value === 'slide';
  });
  // #endregion

  // #region Props sale states
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

  // #region Set url
  /** 상품정보 URL 생성 */
  const makeGoodsURL = (goods: Goods) => {
    return `shop/goodsView/${goods.goodsId}`;
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
  // #endregion

  // #region Events
  /** 관심상품 등록 및 해제 이벤트 */
  const handleToggleWish = (e: Event) => {
    e.preventDefault();

    if (!layoutStore.isLoggedIn) {
      const result = confirm(messages.t('confirm.loginService', { name: '관심상품 등록' }));

      if (result) redirectToMain();
    } else {
      goodsToggleWish({
        isWish: goods.value.isWish ?? false,
        goodsId: goods.value.goodsId,
      });
    }
  };
  // #endregion

  return {
    goodsClasses,
    hasUrl,
    url,
    isTypeOrder,
    isTypeCart,
    isDiscount,
    isTypeList,
    isTypeCard,
    isTypeSlide,
    isSoldOut,
    isSoldStop,
    handleToggleWish,
  };
}

export { props as goodsProps, emits as goodsEmits, goodsExposeComposable };
export type { Type as GoodsType };
