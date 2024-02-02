import { createMemoryHistory, createWebHistory, createRouter as vueCreateRouter } from 'vue-router';
import appConfig from '@/configs/app.config';
import { getRoutes } from './routes';

const createHistory = import.meta.env.SSR ? createMemoryHistory : createWebHistory;

async function createRouter() {
  const router = vueCreateRouter({
    history: createHistory(),
    routes: [],
  });

  const routes = await getRoutes();
  routes.forEach((route) => router.addRoute(route));

  return router;
}

export { createRouter };

// TODO: 라우트 이동 전 옵션 설정
export const addOnRouter = () => {
  const { NonUserAccessibleNames, UserAccessibleNames } = appConfig.routerAccess;
};
