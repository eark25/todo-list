import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import eventBus from './eventBus';

createApp(App).use(eventBus).use(router).mount('#app');