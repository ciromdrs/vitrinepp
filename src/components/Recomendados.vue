<script>
import Roupa from './Roupa.vue';
import { recomendados } from '../data/roupas';
export default {
    components: {
        Roupa
    },
    data() {
        return {
            recomendados
        }
    },
}
</script>

<template>
    <section class="recomendados">
        <div class="top">
            <div class="bg" aria-hidden="true"></div>
            <p>Você também pode gostar</p>
        </div>
        <div class="roupas">
            <Roupa 
            v-for="roupa in recomendados" 
                    :id="roupa.id"
                    :email="roupa.email"
                    :img="roupa.img"
                    :marca="roupa.marca"
                    :nome="roupa.nome"
                ></Roupa>
        </div>
    </section>
</template>

<style scoped>
    .recomendados {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    .top {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .bg {
            position: absolute;
            width: 100%;
            background-color: #c6c6c6;
            height: 2px;
            top: 50%;
        }

        p {
            padding: 1em;
            background-color: var(--off-main);
            z-index: 2;
            font-weight: 600;
            text-transform: uppercase;
        }
    }

    .roupas {
        display: flex;
        gap: 2em;
        justify-content: space-around;
        overflow-x: auto;
        overflow-y: hidden;

        > * {
            min-width: 300px;
        }
    }
</style>