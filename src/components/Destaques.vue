<script>
import Roupa from './Roupa.vue'
import { destaques } from '../data/roupas';
export default {
    components: {
        Roupa
    },

    props: {
        destaques: Array
    }
}
</script>

<template>
    <section class="destaques">
        <h1>Destaques</h1>
        <h3>Os favoritos dos editores.</h3>
        <div class="container">
            <div class="roupaContainer">
                <Roupa 
                    v-for="roupa in destaques" 
                        :roupa
                        :key="roupa.id"
                    destaque
                ></Roupa>
                <!-- Esse 'destaque' é uma classe a adicionar p eu dar estilos únicos a essas -->
            </div>
        </div>
    </section>
</template>

<style scoped>
    h1 {
        font-size: 3em;
        text-transform: uppercase;
        height: fit-content;
        line-height: 1;
        text-align: center;
    }
    
    h3 {
        font-weight: 500;
        line-height: 1;
        text-align: center;
    }

    .container {
        display: flex;
        margin-top: 1em;
        align-items: center;
        justify-content: center;
    }

    .roupaContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2em;
        width: 90%;
        max-width: 1000px;
    }

    @media (max-width: 650px) {
        .roupaContainer {
            flex-direction: column;
        }
    }
</style>