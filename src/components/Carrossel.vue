<script>
import { carrosselTexts } from '../data/roupas';
export default {
    data() {
        return {
            carrosselTexts
        }
    },
}
</script>

<template >
    <section class="carrossel">
        <div class="carrossel-track">
            <span class="caroText" v-for="texto in carrosselTexts"> {{ texto }} </span>
            <span class="caroText" v-for="texto in carrosselTexts"> {{ texto }} </span>
        </div>
    </section>
</template>

<style scoped>
    .carrossel {
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        font-size: 3rem;
        font-weight: 600;
        border: 2px solid black;
        text-transform: uppercase;
        background-image: linear-gradient(to top right, var(--rosewood) 0%, #a83232 100%);
        color: var(--off-white);
        user-select: none;
        overflow: hidden;

    }

    .carrossel-track {
        animation: scroll 20s linear infinite;
        display: flex;
    }

    .caroText {
        flex-shrink: 0;

        &:not(:last-child)::after {
            content: '•';
            margin: 0 1em;
        }
    }

    @keyframes scroll {
        to {
            transform: translateX(calc(-100% - 4.45em));
        }
    }
</style>