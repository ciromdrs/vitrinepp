<script>
import Roupa from './Roupa.vue';
import { roupas } from '../data/roupas';
export default {
    components: {
        Roupa
    },
    methods: {
        scrollToLeft() {
            let content = document.getElementById('scrollAnim');
            content.scrollTo({
                left: content.scrollLeft - 650,
                behavior: 'smooth'
            })
        },
        scrollToRight() {
            let content = document.getElementById('scrollAnim');
            content.scrollTo({
                left: content.scrollLeft + 650,
                behavior: 'smooth'
            })
        }
    },
    // props: {
    //     roupas: Array
    // },
    data() {
        return {
            roupas
        }
    },
}
</script>

<template>
    <section class="history">
        <div class="top">
            <div class="bg" aria-hidden="true"></div>
            <p>Últimas visualizações</p>
        </div>
        <div class="container">
            <button class="leftArrow arrow" @click="scrollToLeft"> < </button>
            <div class="roupas" id="scrollAnim">
                <Roupa 
                    v-for="roupa in roupas" 
                    :id="roupa.id"
                    :email="roupa.email"
                    :img="roupa.img"
                    :marca="roupa.marca"
                    :nome="roupa.nome"
                    ></Roupa>
            </div>
            <button class="rightArrow arrow" @click="scrollToRight"> > </button>
        </div>
    </section>
</template>

<style scoped>
    .history {
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

    .container {
        display: flex;
        gap: 1em;
        width: 100%;
    }

    .roupas {
        display: flex;
        gap: 2em;
        overflow-x: scroll;
        overflow-y: hidden;
        scrollbar-width: none;
        > * {
            flex-shrink: 0;
        }
    }

    .arrow {
        height: 72px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: auto;
        align-self: center;
        font-size: 2em;
        transition: 200ms ease;
        background-color: transparent;
        cursor: pointer;
        outline: none;
        padding: .5em;
        border: none;
        color: var(--text);
        &:hover {
            scale: 1.2;
        }
        &:active {
            scale: 0.8;
        }
    }

    @media (max-width: 500px) {
        .arrow {
            display: none;
        }
        .roupas {
            scrollbar-width: auto;
        }
    }
</style>