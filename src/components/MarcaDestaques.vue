<script>
import { roupas } from '../data/roupas';
import Roupa from './Roupa.vue';

export default {
    components: {
        Roupa
    },
    props: {
        nome: String,
        roupas: Array
    }
}
</script>
<template>
    <section class="marcaDestaques">
        <h2>Destaques de {{ nome }}</h2>
        <div class="container">
            <Roupa v-for="roupa in roupas"
                :roupa="roupa"
                :key="roupa.id"
                >
            </Roupa>
        </div>
    </section>
</template>
<style scoped>
    .marcaDestaques {
        display: flex;
        flex-direction: column;
        gap: 1em;
        align-items: center;
        width: 100%;
    }

    h2 {
        text-transform: uppercase;
        font-size: 2em;
        align-self: flex-start
    }

    .container {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        gap: .5em;
    }
</style>