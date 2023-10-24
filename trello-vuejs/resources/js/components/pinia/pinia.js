import {defineStore} from "pinia";
import {ref, defineComponent, reactive, onMounted, computed} from "vue";
import {useRouter} from "vue-router";
import {text} from "@fortawesome/fontawesome-svg-core";
import {de} from "vuetify/locale";
import Swal from "sweetalert2";

export const useStorage = defineStore('storage', () => {
    const router = useRouter();
    const shareCopyLink = (id) => {
        navigator.clipboard.writeText(`http://127.0.0.1:8000/#/desk/${id}`)
        Swal.fire("Copied Link!")
    }

    // selector for change color
    const selected = ref("default");
    const backgroundColor = ref('black');


    const changeBackground = () => {
        switch (selected.value) {
            case 'orange':
                backgroundColor.value = 'orange';
                break;
            case 'green':
                backgroundColor.value = 'green';
                break;
            default:
                backgroundColor.value = 'black';
                break;
        }
    }
// selector for change badge
    const selectedBadge = ref('default');
    const colorBadge = ref(['red', 'green', 'blue']);


    const changeBackgroundBadge = (deskId) => {

        switch (selectedBadge.value) {
            case 'red':
                colorBadge.value[deskId] = 'red';

                break;
            case 'green':
                colorBadge.value[deskId] = 'green';

                break;
            default :
                colorBadge.value[deskId] = 'blue';

                break;
        }
    }
    const navigateDesk = async (deskId) => {
        await router.push({name: 'ShowDesk', params: {deskId}})
    }

    return {
        selected,
        backgroundColor,
        changeBackground,
        navigateDesk,
        changeBackgroundBadge,
        selectedBadge,
        colorBadge,
        shareCopyLink
    }
})
