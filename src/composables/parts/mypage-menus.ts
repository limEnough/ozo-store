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
    // {
    //   code: PAGE_CODE_DEPTH2['MYPAGE_ORDER_HISTORY'],
    //   name: 'Order History',
    //   url: '/mypage/orderHistory',
    // },
    {
      code: PAGE_CODE_DEPTH2['MYPAGE_WISH'],
      name: 'Wish',
      url: '/mypage/wish',
    },
    {
      code: PAGE_CODE_DEPTH2['MYPAGE_RECENT'],
      name: 'Recent',
      url: '/mypage/recent',
    },
    // {
    //   code: PAGE_CODE_DEPTH2['MYPAGE_BENEFIT'],
    //   name: 'Benefit',
    //   url: '/mypage/benefit',
    // },
    {
      code: PAGE_CODE_DEPTH2['MYPAGE_INQUIRY'],
      name: 'Inquiry',
      url: '/mypage/inquiry',
    },
    {
      code: PAGE_CODE_DEPTH2['MYPAGE_REVIEW'],
      name: 'Review',
      url: '/mypage/review',
    },
    {
      code: PAGE_CODE_DEPTH2['MYPAGE_ADDRESS'],
      name: 'Address',
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
