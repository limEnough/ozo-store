/**
 * MEMO: [공식문서] 참조
 * https://github.com/bluwy/create-vite-extra/blob/master/template-ssr-vue-ts/src/entry-client.ts
 */
import { createApp } from './main';

const init = async () => {
  const { app, router } = await createApp();

  // wait until router is ready before mounting to ensure hydration match
  router.isReady().then(() => {
    app.mount('#app');
  });
};

init();
