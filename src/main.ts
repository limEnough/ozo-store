import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter } from './router/index';
import createCustomI18n from '@/plugins/i18n';

import App from './App.vue';

const app = createApp(App);
const router = await createRouter();
const i18n = await createCustomI18n({
  lang: 'ko',
});

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount('#app');
