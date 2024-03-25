import { type RouteRecordRaw } from 'vue-router';
import { PAGE_CODE_DEPTH1, PAGE_CODE_DEPTH2 } from '@/constants/page-code-constants';
import { MYPAGE_PAGE_NAMES } from '@/constants/path-constants';
import MypageMain from '@/views/mypage/main/index.vue';
import MypageWish from '@/views/mypage/wish/index.vue';
import MypageProfile from '@/views/mypage/profile/index.vue';
import MypageOrderHistory from '@/views/mypage/order-history/index.vue';
import MypageRecent from '@/views/mypage/recent/index.vue';
import MypageBenefit from '@/views/mypage/benefit/index.vue';
import MypageInquiry from '@/views/mypage/inquiry/index.vue';
import MypageReview from '@/views/mypage/review/index.vue';
import MypageAddress from '@/views/mypage/address/index.vue';

const getMypageRoutes = (): RouteRecordRaw[] => {
  return [
    {
      path: '/mypage',
      name: MYPAGE_PAGE_NAMES['mypage'],
      redirect: '/mypage/main',
      meta: {
        pageTitle: '마이페이지',
        pageCode: PAGE_CODE_DEPTH1['MYPAGE'],
      },
      children: [
        {
          path: '/mypage/main',
          name: MYPAGE_PAGE_NAMES['mypage-main'],
          component: MypageMain,
          meta: {
            pageTitle: 'My Page',
            pageCode: PAGE_CODE_DEPTH2['MYPAGE_MAIN'],
          },
        },
        {
          path: '/mypage/wish',
          name: MYPAGE_PAGE_NAMES['mypage-wish'],
          component: MypageWish,
          meta: {
            pageTitle: 'My Wish',
            pageCode: PAGE_CODE_DEPTH2['MYPAGE_WISH'],
          },
        },
        {
          path: '/mypage/profile',
          name: MYPAGE_PAGE_NAMES['mypage-profile'],
          component: MypageProfile,
          meta: {
            pageTitle: 'Edit Profile',
            pageCode: PAGE_CODE_DEPTH2['MYPAGE_PROFILE'],
          },
        },
        {
          path: '/mypage/orderHistory',
          name: MYPAGE_PAGE_NAMES['mypage-order-history'],
          component: MypageOrderHistory,
          meta: {
            pageTitle: 'Order History',
            pageCode: PAGE_CODE_DEPTH2['MYPAGE_ORDER_HISTORY'],
          },
        },
        {
          path: '/mypage/recent',
          name: MYPAGE_PAGE_NAMES['mypage-recent'],
          component: MypageRecent,
          meta: {
            pageTitle: 'Recent View',
            pageCode: PAGE_CODE_DEPTH2['MYPAGE_RECENT'],
          },
        },
        {
          path: '/mypage/benefit',
          name: MYPAGE_PAGE_NAMES['mypage-benefit'],
          component: MypageBenefit,
          meta: {
            pageTitle: 'My Benefit',
            pageCode: PAGE_CODE_DEPTH2['MYPAGE_BENEFIT'],
          },
        },
        {
          path: '/mypage/inquiry',
          name: MYPAGE_PAGE_NAMES['mypage-inquiry'],
          component: MypageInquiry,
          meta: {
            pageTitle: 'My Inquiry',
            pageCode: PAGE_CODE_DEPTH2['MYPAGE_INQUIRY'],
          },
        },
        {
          path: '/mypage/review',
          name: MYPAGE_PAGE_NAMES['mypage-review'],
          component: MypageReview,
          meta: {
            pageTitle: 'My Review',
            pageCode: PAGE_CODE_DEPTH2['MYPAGE_REVIEW'],
          },
        },
        {
          path: '/mypage/address',
          name: MYPAGE_PAGE_NAMES['mypage-address'],
          component: MypageAddress,
          meta: {
            pageTitle: 'My Address',
            pageCode: PAGE_CODE_DEPTH2['MYPAGE_ADDRESS'],
          },
        },
      ],
    },
  ];
};

export default getMypageRoutes;
