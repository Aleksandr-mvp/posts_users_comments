import "bootstrap/dist/css/bootstrap.css";
import { createApp } from 'vue'
import Notifications from '@kyvg/vue3-notification'
import App from './App.vue'
import router from "@/router";
import store from "@/store";

const app = createApp(App)

app.use(router)
app.use(store)
app.use(Notifications)
app.mount('#app')

import "bootstrap/dist/js/bootstrap.js";