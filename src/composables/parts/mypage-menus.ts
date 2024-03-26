import { ref, type PropType } from 'vue';
import { type CustomEmit } from '@/types/common.types';
import type { LayoutMenuList } from '@/services/systems/layout';
import { PAGE_CODE_DEPTH2 } from '@/constants/page-code-constants';

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

export default function mypageMenusComposable(emit: CustomEmit<Emits>, props: Props) {
  // TODO: database 로 옮기고, api 연결하기
  const mypageMenus = ref<LayoutMenuList[]>([
    {
      code: PAGE_CODE_DEPTH2['MYPAGE_ORDER_HISTORY'],
      name: '주문 내역',
      url: '/mypage/orderHistory',
    },
    {
      code: PAGE_CODE_DEPTH2['MYPAGE_WISH'],
      name: '관심 상품',
      url: '/mypage/wish',
    },
    {
      code: PAGE_CODE_DEPTH2['MYPAGE_RECENT'],
      name: '최근 본 상품',
      url: '/mypage/recent',
    },
    {
      code: PAGE_CODE_DEPTH2['MYPAGE_BENEFIT'],
      name: '혜택 관리',
      url: '/mypage/benefit',
    },
    {
      code: PAGE_CODE_DEPTH2['MYPAGE_INQUIRY'],
      name: '문의 내역',
      url: '/mypage/inquiry',
    },
    {
      code: PAGE_CODE_DEPTH2['MYPAGE_REVIEW'],
      name: '후기 내역',
      url: '/mypage/review',
    },
    {
      code: PAGE_CODE_DEPTH2['MYPAGE_ADDRESS'],
      name: '배송지 관리',
      url: '/mypage/address',
    },
  ]);

  const getMenuClasses = (url: LayoutMenuList['url']) => {
    const seperatedUrl = url.split('/');

    return seperatedUrl[seperatedUrl.length - 1] ?? '';
  };

  return { mypageMenus, getMenuClasses };
}

export { props as mypageMenusProps, emits as mypageMenusEmits };
