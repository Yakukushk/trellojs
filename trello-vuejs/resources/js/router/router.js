import {createWebHashHistory, createRouter} from "vue-router";
import {defineComponent} from "vue";
import HomeComponent from "@/components/HomeComponent.vue";
import AboutComponent from "@/components/AboutComponent.vue";
import DeskComponent from "@/components/DeskComponent.vue";
import ShowDesk from "@/components/ShowDesk.vue";


export default defineComponent(createRouter({
    history: createWebHashHistory(),
    routes: [

        {
            path: '/about',
            name: "AboutComponent",
            component: AboutComponent,

        },
        {
            path: '/desk',
            name: "DeskComponent",
            component: DeskComponent,
            alias: '/'
        },
        {
            path: '/desk/:deskId',
            name: "ShowDesk",
            component: ShowDesk,
            props: true
        }

    ]
}))
