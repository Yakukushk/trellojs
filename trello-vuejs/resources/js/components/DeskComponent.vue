<template>

    <div class="container">
        <h1>Desk</h1>
        <button @click.prevent="clickedButton = !clickedButton" type="button" class="btn">
            <font-awesome-icon v-if="clickedButton === false" icon="fa-solid fa-plus"
                               style="width: 30px; height: 30px"/>
            <font-awesome-icon v-if="clickedButton === true" icon="fa-solid fa-minus"
                               style="width: 30px; height: 30px"/>
        </button>
        <section class="mt-2 mb-2" v-if="clickedButton === true">
            <form @submit.prevent="addMethod">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Add Desk</label>
                    <input type="text" v-model="nameDesk" class="form-control">

                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </section>
        <div class="col-lg-4" v-if="errorValidate">
            <div class="alert alert-danger" role="alert">
                A simple danger alert—check it out!
            </div>
        </div>
        <section class="mt-4">
            <div class="row">
                <div class="col-lg-4 mt-4" v-for="desk in desks" :key="desk.id">
                    <div class="card" style="width: 18rem;">

                        <div class="card-body">
                            <h5 class="card-title">{{ desk.name }}</h5>
                            <!--                            <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>-->
                            <!--                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>-->
                            <button class="btn btn-warning btn-sm me-2" @click.prevent="navigateDesk(desk.id)">Update</button>
                            <button class="btn btn-danger btn-sm" @click.prevent="deleteMethod(desk.id)">Delete</button>
                        </div>

                    </div>

                </div>

                <div class="text-center position-absolute top-50 start-50 translate-middle" v-if="loading">
                    <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import {ref, onMounted} from "vue";
import Swal from "sweetalert2";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {useRouter} from "vue-router";

export default {
    name: "DeskComponent",
    components: {FontAwesomeIcon},
    setup() {
        const desks = ref([]);
        const errorValidate = ref(false);
        const loading = ref(true);
        const clickedButton = ref(false);
        const nameDesk = ref('');
        const router = useRouter();
        onMounted(() => {
            console.log(clickedButton)
        });
        const api = () => {
            axios.get('/api/desk', {
                name: name.value
            })
                .then((response) => {
                    console.log(response);
                    desks.value = response.data;
                })
                .catch((error) => {
                    errorValidate.value = true;
                    console.error(error);
                })
                .finally(() => {
                    loading.value = false;
                });
        }
        const addMethod = () => {
            Swal.fire({
                title: "You want add new table",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, add it!'

            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post('/api/desk', {
                        name: nameDesk.value
                    })
                        .then((response) => {
                            console.log(response);
                            desks.value = [];
                            api();
                        })
                        .catch((error) => {
                            errorValidate.value = true;
                            console.error(error);
                        })
                        .finally(() => {
                            loading.value = false;
                        });
                }
            })
        }
        const deleteMethod = (id) => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post(`/api/desk/${id}`, {
                        _method: "DELETE"
                    })
                        .then((response) => {
                            console.log(response);
                            desks.value = [];
                            api();
                        })
                        .catch((error) => {
                            errorValidate.value = true;
                            console.error(error);
                        })
                        .finally(() => {
                            loading.value = false;
                        });
                    Swal.fire(
                        'Deleted!',
                        'Your table has been deleted.',
                        'success'
                    )
                }


            })
        }
        const navigateDesk = async (deskId) => {
            await router.push({name: 'ShowDesk', params: {deskId}}).finally(() => {
                loading.value = false;
            })
        }

        onMounted(() => api());
        return {
            desks, errorValidate, loading, deleteMethod, clickedButton, addMethod, nameDesk, navigateDesk
        }
    }
}
</script>

<style scoped>

</style>
