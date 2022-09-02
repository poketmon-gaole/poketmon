import { createApp } from 'vue'
import App from './index.vue'
import BootstrapVue from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import VueSimpleAlert from "vue3-simple-alert-next"
 
const app = createApp(App)
app.use(BootstrapVue)
app.use(VueSimpleAlert)
app.mount('#app')