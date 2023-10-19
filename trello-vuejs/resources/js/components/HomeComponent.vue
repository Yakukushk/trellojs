<template>
<h1>{{txt}}</h1>
</template>

<script>
import {defineComponent, ref} from "vue";

export default defineComponent({
    name: "HomeComponent",
    setup(){
        const txt = ref("Home");
        return{
            txt
        }
    }
})
</script>

<style scoped>

</style>
