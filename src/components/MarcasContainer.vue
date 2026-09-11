<script>
import Marca from './Marca.vue';
export default {
    components: {
        Marca
    },
    props: {
        marcas: Array,
        editar: Boolean, // para páginas ADM
        deletar: Boolean // para páginas ADM
    }
}
</script>

<template>
    <div class="container">
        <Marca
            v-for="marca in marcas"
            :marca  
            :key="marca.id_marca"
            :editar
            :deletar
            @selecionarMarca="$emit('selecionar-marca', marca)"
        ></Marca>
    </div>
</template>

<style scoped>
    .container {
        display: flex;
        gap: 2em;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>