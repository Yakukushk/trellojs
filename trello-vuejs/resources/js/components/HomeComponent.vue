<template>
    <header>
        <header-component/>
    </header>
<h1>{{txt}}</h1>
</template>

<script>
import {defineComponent, ref} from "vue";
import HeaderComponent from "./SIteComponent/HeaderComponent.vue";

export default defineComponent({
    name: "HomeComponent",
    components: {HeaderComponent},
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
