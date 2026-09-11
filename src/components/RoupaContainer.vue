<script>
import Roupa from './Roupa.vue'
export default {
    components: {
        Roupa
    },
    props: {
        roupas: Array,
        editar: Boolean, // para páginas ADM
        deletar: Boolean // para páginas ADM
    }
}
</script>
<template>
    <div class="container">
        <Roupa
            v-for="roupa in roupas" 
            :roupa="roupa"
            :key="roupa.id"
            :editar
            :deletar
            @selecionarRoupa="$emit('selecionar-roupa', roupa)"
        ></Roupa>
    </div>
</template>
<style scoped>
    .container {
        display: flex;
        justify-content: center;
        gap: 2em;
        flex-wrap: wrap;
    }
</style>