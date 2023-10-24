import './bootstrap';
import {createApp} from "vue/dist/vue.esm-bundler";
import MainComponent from "@/components/MainComponent.vue";
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import router from "@/router/router.js";
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faUserSecret, faPlus, faMinus, faPen, faTrash, faEye, faPalette, faShare} from '@fortawesome/free-solid-svg-icons'

//vuetify
// import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives
})

// pinia
import { createPinia } from 'pinia'

library.add(faPlus, faMinus, faPen, faTrash, faEye, faPalette, faShare)
// import bootstrap from 'bootstrap/dist/css/bootstrap.css';
const app = createApp({
    components: {
        MainComponent
    }
})
const pinia = createPinia()
app.use(bootstrap);
app.use(vuetify);

app.use(router);
app.use(pinia);
app.mount('#app');
