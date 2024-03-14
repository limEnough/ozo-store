import { type RouteRecordRaw } from 'vue-router';
import { PAGE_CODE_DEPTH1, PAGE_CODE_DEPTH2 } from '@/constants/page-code-constants';
import { MYPAGE_PAGE_NAMES } from '@/constants/path-constants';
import MypageMain from '@/views/mypage/main/index.vue';

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
            pageTitle: 'My page',
            pageCode: PAGE_CODE_DEPTH2['MYPAGE_MAIN'],
          },
        },
        {
          path: '/mypage/wish',
          name: MYPAGE_PAGE_NAMES['mypage-wish'],
          component: MypageMain,
          meta: {
            pageTitle: 'Wish',
            pageCode: PAGE_CODE_DEPTH2['MYPAGE_WISH'],
          },
        },
      ],
    },
  ];
};

export default getMypageRoutes;
