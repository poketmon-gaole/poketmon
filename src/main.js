import { createApp } from 'vue'
import App from './index.vue'
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

const app = createApp(App)
app.component('VueLoading', VueLoading)
app.mount('#app')