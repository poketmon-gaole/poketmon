import { createApp } from 'vue'
import { router } from './router';
import App from './index.vue'
import BootstrapVue from 'bootstrap-vue-3'
import VueSimpleAlert from "vue3-simple-alert-next"
import VueViewer from 'v-viewer'
import 'bootstrap/dist/css/bootstrap.css'
import 'viewerjs/dist/viewer.css'

const app = createApp(App)
app.use(router)
app.use(BootstrapVue)
app.use(VueSimpleAlert)
app.use(VueViewer)
app.mount('#app')