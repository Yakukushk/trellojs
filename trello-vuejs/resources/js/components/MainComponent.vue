<template>
    <router-view :key="$route.fullPath" />
</template>

<script setup lang="js">
import {useRouter} from "vue-router";

const router = useRouter();
</script>

<style>
/*body,html {*/
/*    background-image: url("https://media.tenor.com/9vRAkntogEMAAAAd/background.gif");*/
/*    background-size: cover;*/
/*}*/





</style>
