import { createWebHistory, createRouter as vueCreateRouter, type RouteRecordName } from 'vue-router';
import appConfig from '@/configs/app.config';
import { useLayoutStore } from '@/stores/layout';
import type { VueContext } from '@/types/common.types';
import { MAIN_PAGE_NAMES, MEMBER_PAGE_NAMES } from '@/constants/path-constants';
import { getRoutes } from './routes';

export async function createRouter() {
  const router = vueCreateRouter({
    history: createWebHistory(),
    routes: [],
  });

  const routes = await getRoutes();
  routes.forEach((route) => router.addRoute(route));

  return router;
}

// 라우트 이동 전 옵션 설정
export const addOnRouter = (vueContext: VueContext) => {
  const mainPath = vueContext.router.resolve({ name: MAIN_PAGE_NAMES['main'] }).path;
  const loginPath = vueContext.router.resolve({ name: MEMBER_PAGE_NAMES['member-login'] }).path;

  const { NonUserAccessibleNames, UserAccessibleNames, UserRedirectNames } = appConfig.routerAccess;

  vueContext.router.beforeEach((to: any) => {
    const layoutStore = useLayoutStore();

    // 로그인 케이스
    if (layoutStore.isLoggedIn) {
      if (UserRedirectNames.includes(to.name as RouteRecordName)) {
        return mainPath;
      }
    }
    // 비로그인 case
    else {
      if (UserAccessibleNames.includes(to.name as RouteRecordName)) {
        return loginPath;
      }
    }
  });
};
