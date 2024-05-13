import { computed, toRefs, type PropType } from 'vue';
import { type CustomEmit } from '@/types/common.types';
import { GOODS_DISPLAY_SALES_STATUS_CODE, type GoodsDisplaySalesStatusCode } from '@/constants/shop-constants';
import { mapClasses } from '@/utils/classes';
import { useLayoutStore } from '@/stores/layout';
import { useI18n } from 'vue-i18n';
import type { APICode, APIMoney } from '@/types/api.types';
import { useRedirect } from '@/composables/use/use-redirect';
import { db } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useUserStore } from '@/stores/user';

type Type = 'list' | 'order' | 'cart' | 'card' | 'slide';

type Emits = 'toggle-wish';

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
  goodsId: Goods['goodsId'] | null;
}

interface Props {
  goods: Goods;
  type: Type;
  link: string;
  useLink: boolean;
  openOnNewTab: boolean;
  hideWish: boolean;
}

const emits: Emits[] = ['toggle-wish'];

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

const goodsExposeComposable = () => {
  const userStore = useUserStore();

  /** [API] 관심상품 toggle */
  const patchToggleWish = async ({ goodsId, isWish }: WishModel) => {
    const response: ToggleWishResult = {
      isSuccess: false,
      isWish,
      goodsId,
    };

    if (userStore.userInfo) {
      // 1. store userInfo 업데이트
      if (!isWish) {
        // 관싱상품 추가
        userStore.userInfo.wish.push(goodsId);
      } else {
        // 관심상품 해제
        userStore.userInfo.wish = userStore.userInfo?.wish.filter((goods) => goods !== goodsId) as number[];
      }

      // 2. firebase 업데이트
      try {
        const userWishRef = doc(db, 'users', userStore.userInfo.userKey);

        await updateDoc(userWishRef, {
          wish: userStore.userInfo.wish,
        });

        response.isSuccess = true;
        response.isWish = !isWish;
        response.goodsId = goodsId;
      } catch (error) {
        console.error(error);
      }
    }

    return response;
  };

  /** [EVENT] 관심상품 toggle */
  const toggleWish = async (goods: WishModel) => {
    const response: ToggleWishResult = {
      isSuccess: false,
      isWish: false,
      goodsId: null,
    };

    try {
      const result = await patchToggleWish(goods);

      response.isSuccess = result.isSuccess;
      response.isWish = result.isWish;
      response.goodsId = result.goodsId;

      return response;
    } catch (error) {
      console.error('toggleWish', error);
      return response;
    }
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
  const { redirectToLogin } = useRedirect();

  // #region Props goods
  const goodsForm = computed({
    get: () => props.goods,
    set: (value) => emit('update:modelValue', value),
  });
  // #endregion

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
  const handleToggleWish = async (e: Event) => {
    e.preventDefault();

    // 1. 로그인 여부 확인
    if (!layoutStore.isLoggedIn) {
      const result = confirm(messages.t('confirm.loginService', { name: '관심상품 등록' }));

      if (result) redirectToLogin();

      return;
    }

    // 2. toggle 이벤트 실행
    try {
      const result = await goodsToggleWish({
        isWish: goods.value.isWish ?? false,
        goodsId: goods.value.goodsId,
      });

      if (result?.isSuccess) {
        // 컴포넌트 자체 값 업데이트
        goodsForm.value.isWish = !goodsForm.value.isWish;
        goodsForm.value.goodsId = result.goodsId as number;

        // 컴포넌트 상위에 업데이트 값 emit
        emit('toggle-wish', result);
      }
    } catch (error) {
      console.error('has error handleToggleWish', error);
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
