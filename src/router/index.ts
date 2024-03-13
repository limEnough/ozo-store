import {
  createMemoryHistory,
  createWebHistory,
  createRouter as vueCreateRouter,
  type RouteRecordName,
} from 'vue-router';
import appConfig from '@/configs/app.config';
import { useLayoutStore } from '@/stores/layout';
import type { VueContext } from '@/types/common.types';
import { MAIN_PAGE_NAMES } from '@/constants/path-constants';
import { getRoutes } from './routes';

const createHistory = import.meta.env.SSR ? createMemoryHistory : createWebHistory;

export async function createRouter() {
  const router = vueCreateRouter({
    history: createHistory(),
    routes: [],
  });

  const routes = await getRoutes();
  routes.forEach((route) => router.addRoute(route));

  return router;
}

// 라우트 이동 전 옵션 설정
export const addOnRouter = (vueContext: VueContext) => {
  const mainPath = vueContext.router.resolve({ name: MAIN_PAGE_NAMES['main'] }).path;

  const { NonUserAccessibleNames, UserAccessibleNames, UserRedirectNames } = appConfig.routerAccess;

  vueContext.router.beforeEach((to: any) => {
    const layoutStore = useLayoutStore();

    if (UserRedirectNames.includes(to.name as RouteRecordName) && layoutStore.isLoggedIn) {
      return mainPath;
    }
  });
};
