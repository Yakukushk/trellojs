import './bootstrap';
import {createApp} from "vue/dist/vue.esm-bundler";
import MainComponent from "@/components/MainComponent.vue";
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import router from "@/router/router.js";
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faUserSecret, faPlus, faMinus, faPen, faTrash, faEye} from '@fortawesome/free-solid-svg-icons'


library.add(faPlus, faMinus, faPen, faTrash, faEye)
// import bootstrap from 'bootstrap/dist/css/bootstrap.css';
const app = createApp({
    components: {
        MainComponent
    }
})

app.use(bootstrap);

app.use(router);
app.mount('#app');
