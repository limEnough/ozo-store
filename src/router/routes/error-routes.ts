import { type RouteRecordRaw } from 'vue-router';
import { PAGE_CODE_ERROR } from '@/constants/page-code-constants';
import { ERROR_PAGE_NAMES } from '@/constants/path-constants';
import Error404 from '@/views/error/404/index.vue';
import Error500 from '@/views/error/500/index.vue';

const getErrorRoutes = (): RouteRecordRaw[] => {
  return [
    {
      path: '/:pathMatch(.*)*',
      name: ERROR_PAGE_NAMES['error'],
      redirect: '/error/404',
      meta: {
        pageTitle: '에러 페이지',
        pageCode: PAGE_CODE_ERROR['ERROR'],
      },
      children: [
        {
          path: '/error/404',
          name: ERROR_PAGE_NAMES['error-404'],
          component: Error404,
          meta: {
            pageTitle: '404 error',
            pageCode: PAGE_CODE_ERROR['ERROR_404'],
          },
        },
        {
          path: '/error/500',
          name: ERROR_PAGE_NAMES['error-500'],
          component: Error500,
          meta: {
            pageTitle: '500 error',
            pageCode: PAGE_CODE_ERROR['ERROR_500'],
          },
        },
      ],
    },
  ];
};

export default getErrorRoutes;
