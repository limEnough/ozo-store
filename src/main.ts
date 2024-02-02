import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter } from './router/index';
import App from './App.vue';

const app = createApp(App);
const router = await createRouter();

app.use(createPinia());
app.use(router);

app.mount('#app');
