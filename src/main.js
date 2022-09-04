import { createApp } from 'vue'
import App from './index.vue'
import BootstrapVue from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import VueSimpleAlert from "vue3-simple-alert-next"
import VueEasyLightbox from 'vue-easy-lightbox'
import 'vue-easy-lightbox/external-css/vue-easy-lightbox.css'

const app = createApp(App)
app.use(BootstrapVue)
app.use(VueSimpleAlert)
app.use(VueEasyLightbox)
app.mount('#app')