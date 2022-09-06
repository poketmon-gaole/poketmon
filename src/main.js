import { createApp } from 'vue'
import { router } from './router';
import App from './index.vue'
import BootstrapVue from 'bootstrap-vue-3'
import VueSimpleAlert from "vue3-simple-alert-next"
import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App)
app.use(router)
app.use(BootstrapVue)
app.use(VueSimpleAlert)
app.mount('#app')