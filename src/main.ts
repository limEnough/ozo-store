/**
 * Vite SSR
 * SSR은 동일한 전체 사이트를 Node.js에서 동작시키고, 이를 HTML로 사전 렌더링 한 후,
 * 마지막으로 이를 클라이언트의 프론트엔드 프레임워크(Vue)에서 가져오도록 하는 기능이다.
 */
import { createSSRApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, addOnRouter } from './router/index';
import createCustomI18n from '@/plugins/i18n';
import vueCookies from 'vue-cookies';

import App from './App.vue';
import type { VueContext } from './types/common.types';

export async function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  const router = await createRouter();
  const vueContext: VueContext = { store: pinia, router };
  const i18n = await createCustomI18n({
    lang: 'ko',
  });

  const isSSR = import.meta.env.SSR;

  addOnRouter(vueContext);

  app.use(pinia);
  app.use(router);
  app.use(i18n);
  app.use(vueCookies);

  return {
    app,
    router,
  };
}
