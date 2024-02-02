import { type RouteRecordRaw } from 'vue-router';
import { PAGE_CODE_MAIN } from '@/constants/page-code-constants';
import { MAIN_PAGE_NAMES } from '@/constants/path-constants';
import Main from '@/views/main/index.vue';

const getMainRoutes = (): RouteRecordRaw[] => {
  return [
    {
      path: '/',
      name: MAIN_PAGE_NAMES['main'],
      component: () => Main,
      meta: {
        pageTitle: '메인',
        pageCode: PAGE_CODE_MAIN['MAIN'],
      },
    },
  ];
};

export default getMainRoutes;
