import './bootstrap';
import {createApp} from "vue/dist/vue.esm-bundler";
import MainComponent from "@/components/MainComponent.vue";
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import router from "@/router/router.js";
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faUserSecret, faPlus, faMinus, faPen, faTrash, faEye} from '@fortawesome/free-solid-svg-icons'

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

library.add(faPlus, faMinus, faPen, faTrash, faEye)
// import bootstrap from 'bootstrap/dist/css/bootstrap.css';
const app = createApp({
    components: {
        MainComponent
    }
})

app.use(bootstrap);
app.use(vuetify);

app.use(router);
app.mount('#app');
