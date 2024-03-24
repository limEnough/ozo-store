import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, addOnRouter } from './router/index';
import createCustomI18n from '@/plugins/i18n';
import vueCookies from 'vue-cookies';
import { createPersistedState } from 'pinia-plugin-persistedstate';

import App from './App.vue';
import type { VueContext } from './types/common.types';

const createProject = async () => {
  const app = createApp(App);
  const pinia = createPinia();

  // 새로고침 하는 경우 상태 초기화 방지 위해 설정
  pinia.use(
    createPersistedState({
      storage: localStorage,
      auto: true,
    }),
  );

  const router = await createRouter();
  const vueContext: VueContext = { store: pinia, router };
  const i18n = await createCustomI18n({
    lang: 'ko',
  });

  addOnRouter(vueContext);

  app.use(pinia);
  app.use(router);
  app.use(i18n);
  app.use(vueCookies);

  app.mount('#app');
};

createProject();
