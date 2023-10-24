<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">TrelloJS</a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                    <li class="nav-item">
                        <a class="nav-link" @click.prevent="router.push('/desk')">Home</a>
                    </li>

                    <li>
                        <div class="dropdown">
                            <button class="btn btn-white dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Desks
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" v-for="desk in desks" :key="desk.id" @click.prevent="navigateDesk(desk.id)">{{ desk.name }}</a></li>
                                <li><a class="dropdown-item" href="#">All Desk</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
        <select class="form-select" v-model="store.selected" @change.prevent="store.changeBackground" style="width: 110px; margin-right: 10px">
            <option value="default">Black</option>
            <option value="green">Green</option>
            <option value="orange">Orange</option>
        </select>
    </nav>
    <div class="text-center position-absolute top-50 start-50 translate-middle" v-if="loading">
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<script lang="js">
import {useRouter} from "vue-router";
import {useStorage} from "../pinia/pinia.js";
import {computed, ref, defineComponent, onMounted} from "vue";
export default defineComponent({
    name: "HeaderComponent",
    props: ['deskId'],
    setup(props){
        const router = useRouter();
        const store = useStorage();
        const errorValidate = ref(false);
        const loading = ref(true);
        const desks = ref([]);
        const api = () => {
            axios.get('/api/desk', {
                name: name.value
            })
                .then((response) => {

                    desks.value = response.data;
                    console.log(response);
                })
                .catch((error) => {
                    errorValidate.value = true;
                    console.error(error);
                })
                .finally(() => {
                    loading.value = false;
                });
        }
        const navigateDesk = async (deskId) => {
            await router.push({ name: 'ShowDesk', params: { deskId } });
            loading.value = false;
        }

        onMounted(api);

        return {
            router, store, desks, navigateDesk, loading
        }
    }
})


</script>

<style>

</style>
