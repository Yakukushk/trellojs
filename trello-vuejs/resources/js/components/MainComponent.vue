<template>

    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                       <a class="nav-link" @click.prevent="router.push('/desk')">Desks</a>
                    </li>
<!--                    <li class="nav-item">-->
<!--                        <a class="nav-link" :href="router.push('/about')">About</a>-->
<!--                    </li>-->

                </ul>

            </div>
        </div>
    </nav>

    <router-view></router-view>
</template>

<script setup lang="js">
import {defineComponent} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
</script>

<style scoped>

</style>
