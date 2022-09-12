import { createApp } from 'vue'
import { router } from './router';
import App from './index.vue'
import BootstrapVue from 'bootstrap-vue-3'
import Notifications from '@kyvg/vue3-notification'
import VueViewer from 'v-viewer'
import 'bootstrap/dist/css/bootstrap.css'
import 'viewerjs/dist/viewer.css'

const app = createApp(App)
app.use(router)
app.use(BootstrapVue)
app.use(Notifications)
app.use(VueViewer)
app.mount('#app')