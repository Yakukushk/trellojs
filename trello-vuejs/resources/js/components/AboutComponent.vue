<template>
<h1>{{txt}}</h1>
</template>

<script>
import {defineComponent, ref} from "vue";

export default defineComponent({
    name: "AboutComponent",
    setup(){
        const txt = ref("About")
        return{
            txt
        }
    }
})
</script>

<style scoped>

</style>
