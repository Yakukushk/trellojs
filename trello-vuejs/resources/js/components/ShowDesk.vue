<template>
    <header>
        <header-component/>
    </header>
    <div class="container">
        <section>
            <a href="" class="me-2 link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
               style="font-size: 30px" @click.prevent="clickedButtons.update = !clickedButtons.update">{{ name }}</a>
            <a @click.prevent="clickedButtons.add = !clickedButtons.add" type="button">
                <font-awesome-icon v-if="clickedButtons.add  === false" icon="fa-solid fa-plus"
                                   style="width: 20px; height: 20px"/>
                <font-awesome-icon v-if="clickedButtons.add  === true" icon="fa-solid fa-minus"
                                   style="width: 20px; height: 20px"/>
            </a>
        </section>
        <section v-if="clickedButtons.update === true">
            <form @submit.prevent="saveName">
                <div className="form-group mt-sm-5">
                    <input type="text" v-model="name" class="form-control" id="exampleInputText">
                </div>
                <div class="button mt-4">
                    <button class="btn btn-primary" type="submit">Update</button>
                </div>
            </form>
        </section>
        <section class="mt-2 mb-2" v-if="clickedButtons.add === true">
            <form @submit.prevent="addMethod">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Add Desk</label>
                    <input type="text" v-model="deskListValue" class="form-control">

                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </section>
        <section class="mt-4">
            <div class="row">
                <div class="col-lg-4 mt-4" v-for="desk in desk_list" :key="desk.id">
                    <div class="card" style="width: 18rem;">

                        <div class="card-body">
                            <h3 class="card-title">{{ desk.name }}</h3>

                            <form @submit.prevent="updateDeskList(desk.id, desk.name)"
                                  v-if="clickedButtons.updateList === desk.id"
                                  class="d-flex justify-content-between align-items-center mb-3">


                                <input type="text" v-model="desk.name" class="form-control me-2" id="exampleInputText"/>
                                <button @click="clickedButtons.updateList = null" type="button" class="btn-close"
                                        aria-label="Close"></button>


                            </form>
                            <a v-else @click="clickedButtons.updateList= desk.id">
                                <font-awesome-icon icon="fa-solid fa-pen" class="me-2" style="cursor: pointer"/>
                            </a>
                            <a @click.prevent="deleteMethod(desk.id)" style="cursor: pointer">
                                <font-awesome-icon icon="fa-solid fa-trash"/>
                            </a>
                            <div class="card mt-3 bg-light" v-for="card in desk.cards" :key="card.id">
                                <div class="card-body">
                                    <h4 class="card-title d-flex justify-content-between align-items-center mb-3">
                                        {{ card.name }}</h4>
                                    <a @click.prevent="deleteMethodCard(card.id)" style="cursor: pointer">
                                        <font-awesome-icon icon="fa-solid fa-trash"/>
                                    </a>
                                    <v-dialog width="600">
                                        <template v-slot:activator="{ props }">
                                            <a v-bind="props" @click.prevent="getListCard(card.id)"
                                               style="cursor: pointer; margin-left: 10px">
                                                <font-awesome-icon icon="fa-solid fa-eye"/>
                                            </a>
                                        </template>

                                        <template v-slot:default="{ isActive }">
                                            <v-card :title="currentCard.name">
                                                <v-card-text>

                                                    <a @click.prevent="clickedButtons.showCard = !clickedButtons.showCard"
                                                       style="cursor: pointer; margin-left: 10px">
                                                        <font-awesome-icon icon="fa-solid fa-pen" class="me-2"
                                                                           style="cursor: pointer"/>
                                                    </a>

                                                    <a @click.prevent="clickedButtons.showAddTask = !clickedButtons.showAddTask"
                                                       style="cursor: pointer; margin-left: 5px">
                                                        <font-awesome-icon icon="fa-solid fa-plus"
                                                                           style="cursor: pointer"/>
                                                    </a>

                                                </v-card-text>

                                                <v-container fluid v-if="clickedButtons.showAddTask === true">
                                                    <form @submit.prevent="addMethodTask(currentCard.id)">
                                                        <div>
                                                            <label for="exampleInputEmail1" class="form-label">Add
                                                                Task</label>
                                                            <input v-model="taskDesk" type="text"
                                                                   class="form-control"
                                                                   id="exampleInputText"
                                                                   placeholder="Input name for your card">

                                                        </div>
                                                        <!--                                <button type="submit" class="btn btn-primary">Submit</button>-->
                                                    </form>
                                                </v-container>


                                                <v-container fluid>
                                                    <form v-if="clickedButtons.showCard === true"
                                                          @submit="getUpdateCard()"
                                                          class="justify-content-between align-items-center">
                                                        <label for="exampleInputEmail1" class="form-label">Change Name
                                                        </label>
                                                        <input type="text" v-model="currentCard.name"
                                                               class="form-control" id="exampleInputText"/>


                                                    </form>
                                                </v-container>

                                                <v-card-actions>
                                                    <v-container fluid>
                                                        <div class="form-check" v-for="tasks in currentCard.task">
                                                            <input  class="form-check-input" type="checkbox" value=""
                                                                   id="flexCheckDefault">
                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                {{ tasks.name }}
                                                            </label>
                                                            <br/>
                                                            <a @click.prevent="deleteMethodTask(tasks.id)" style="cursor: pointer">
                                                                <font-awesome-icon icon="fa-solid fa-trash"/>
                                                            </a>
                                                            <hr/>
                                                        </div>
                                                    </v-container>
                                                </v-card-actions>
                                                <v-card-actions>
                                                    <!--                                                    <v-spacer></v-spacer>-->


                                                    <v-btn
                                                        text="Close Card"
                                                        class="mt-4"
                                                        @click="isActive.value = false"
                                                    ></v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </template>
                                    </v-dialog>

                                </div>


                            </div>
                            <form @submit.prevent="addMethodCard(desk.id)">
                                <div class="mb-3 mt-3">
                                    <label for="exampleInputEmail1" class="form-label">Add Card</label>
                                    <input v-model="cardDesk[desk.id]" type="text" class="form-control"
                                           id="exampleInputText"
                                           placeholder="Input name for your card">

                                </div>
                                <!--                                <button type="submit" class="btn btn-primary">Submit</button>-->
                            </form>

                            <!--                            <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>-->
                            <!--                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>-->
                            <!--                            <button class="btn btn-warning btn-sm me-2" @click.prevent="navigateDesk(desk.id)">Update</button>-->

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
import {ref, onMounted, reactive, customRef} from 'vue';
import * as sweetalert2 from "sweetalert2";
import Swal from "sweetalert2";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import AboutComponent from "./AboutComponent.vue";
import HeaderComponent from "./SIteComponent/HeaderComponent.vue";

export default {
    name: "ShowDesk",
    components: {HeaderComponent, FontAwesomeIcon, AboutComponent},
    props: ['deskId'],
    setup(props) {
        const name = ref('');
        const deskListValue = ref('');
        const errorValidate = ref(false);
        const loading = ref(true);
        const desk_list = ref([]);
        const cardDesk = ref([]);
        const currentCard = ref([]);
        const taskDesk = ref('');

        const clickedButtons = reactive({
            add: ref(false),
            update: ref(false),
            updateList: null,
            showCard: ref(false),
            showAddTask: ref(false)
        })


        const saveName = () => {
            axios
                .post(`/api/desk/${props.deskId}`, {name: name.value, _method: 'PUT'})
                .then((response) => {
                    console.log(response);
                    name.value = response.data.data.name;
                    Swal.fire({
                        title: 'Success!',
                        text: 'Item was updated',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })

                })
                .catch((error) => {
                    errorValidate.value = true;
                    console.error(error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Do you want to continue',
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
                })

        }; // DeskController, so do not forget

        //  DeskListController all methods
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
                    axios.post(`/api/desk-lists/${id}`, {
                        _method: "DELETE"
                    })
                        .then((response) => {
                            console.log(response);
                            desk_list.value = [];
                            getList();
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
        const addMethod = () => {
            Swal.fire({
                title: "You want add new table?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, add it!'

            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post('/api/desk-lists', {
                        name: deskListValue.value,
                        desk_id: props.deskId
                    })
                        .then((response) => {
                            console.log(response);
                            deskListValue.value = "";
                            desk_list.value = [];
                            getList();
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
        };
        const updateDeskList = (id, name) => {
            axios.post(`/api/desk-lists/${id}`, {
                name,
                _method: 'PUT'
            }).then((response) => {
                clickedButtons.updateList = null
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
        const getList = () => {
            axios.get('/api/desk-lists', {
                params: {
                    desk_id: props.deskId
                }
            })
                .then((response) => {
                    console.log(response);
                    desk_list.value = response.data.data;
                    desk_list.value.forEach(el => {
                        cardDesk.value[el.id] = '';
                    });
                })
                .catch((error) => {
                    errorValidate.value = true;
                    console.error(error);
                })
                .finally(() => {
                    loading.value = false;
                });
        };


        // CardController all methods
        const getListCard = (id) => {
            axios.get(`api/card/${id}`)
                .then((response) => {
                    currentCard.value = response.data.data;
                    console.log(response);
                    // console.log(currentCard.value.task);


                })
                .catch((error) => {
                    errorValidate.value = true;
                    console.error(error);
                })
                .finally(() => {
                    loading.value = false;
                });


        }
        const getUpdateCard = () => {
            axios.post(`/api/card/${currentCard.value.id}`, {
                _method: 'PATCH',
                name: currentCard.value.name,
                desk_list_id: currentCard.value.desk_list_id,

            }).then((response) => {
                // clickedButtons.showCard = false;
                currentCard.value = [];
                getList();
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
        const deleteMethodCard = (id) => {
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
                    axios.post(`/api/card/${id}`, {
                        _method: "DELETE"
                    })
                        .then((response) => {
                            console.log(response);
                            cardDesk.value = [];
                            getList();
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
        const addMethodCard = (desk_list_id) => {
            Swal.fire({
                title: "You want add new card?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, add it!'

            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post('/api/card', {
                        name: cardDesk.value[desk_list_id],
                        desk_list_id
                    })
                        .then((response) => {
                            cardDesk.value[desk_list_id] = "";
                            getList();
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
            })
        };


        // TaskController all methods
        const addMethodTask = (card_id) => {

            axios.post('/api/task', {
                name: taskDesk.value,
                card_id: card_id
            })
                .then((response) => {
                    taskDesk.value = "";
                    getListCard(card_id);
                    console.log(response);

                })
                .catch((error) => {
                    errorValidate.value = true;
                    console.error(error.response);
                })
                .finally(() => {
                    loading.value = false;
                });


        }
        const deleteMethodTask = (id) =>{

                    axios.post(`/api/task/${id}`, {
                        _method: "DELETE"
                    })
                        .then((response) => {
                            console.log(response);
                            getListCard(currentCard.value.id);
                        })
                        .catch((error) => {
                            errorValidate.value = true;
                            console.error(error);
                        })
                        .finally(() => {
                            loading.value = false;
                        });

        }

        const api = () => {
            axios
                .get(`/api/desk/${props.deskId}`)
                .then((response) => {
                    console.log(response);
                    name.value = response.data.data.name;
                })
                .catch((error) => {
                    errorValidate.value = true;
                    console.error(error);
                })
                .finally(() => {
                    loading.value = false;
                });
        };

        onMounted(api);
        onMounted(getList);

        return {
            name,
            desk_list,
            saveName,
            getList,
            api,
            loading,
            errorValidate,
            addMethod,
            clickedButtons,
            deskListValue,
            deleteMethod,
            updateDeskList,
            cardDesk,
            addMethodCard,
            deleteMethodCard,
            getListCard,
            currentCard,
            getUpdateCard,
            taskDesk,
            addMethodTask,
            deleteMethodTask

        };
    },
};
</script>

<style scoped></style>
