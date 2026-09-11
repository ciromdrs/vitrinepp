<script>
export default {
    props: {
        roupa: Object,
        editar: Boolean, // para páginas ADM
        deletar: Boolean // para páginas ADM
    },
    methods: {
        mudarRoupa() { // selecionar roupa para deletar
            this.$emit('selecionar-roupa', this.roupa)
        }
    }
}
</script>

<template>
    <div class="roupa" :class="{ destaque: roupa.destaque }">
        <figure :title="roupa.nome">
            <button v-if="deletar" @click="mudarRoupa"> <!-- p/ deletar roupas, botão de ativar modal -->
                <img :src="roupa.img" alt="Imagem da roupa">
            </button>
            <router-link v-else 
            :to="`${editar ? `/admEditar/${roupa.id}/` : `/loja/${roupa.id}`}`"> <!-- p/ editar ou ir para a roupa -->
                <img :src="roupa.img" alt="Imagem da roupa">
            </router-link>
        </figure>
        <div class="description">
            <p class="loja">{{ roupa.marca_nome }}</p>
            <h3 class="nome">{{ roupa.nome }}</h3>
        </div>
    </div>
</template>

<style scoped>

    .roupa {
        width: 300px;
        max-width: 90vw;
        display: flex;
        flex-direction: column;
        gap: .25em;
        font-size: 1.2em;
        text-transform: uppercase;
    }

    /* Roupas do 'Destaque' */
    .home .roupa.destaque {
        flex-grow: 1;
        figure {
            aspect-ratio: 600 / 650;
            height: auto;
            max-width: 600px;
        }
    }

    figure {
        border: 2px solid var(--text);
        overflow: hidden;
        height: 300px;
        position: relative;
        background-color: var(--figure-bg);
        img {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            transition: 0.2s ease;
            aspect-ratio: 1 / 1;
            &:hover {
                transform: translate(-50%, -50%) scale(1.1);
            }
        }
    }

    .loja {
        color: var(--subtext);
        font-weight: 500;
    }

    .nome {
        font-weight: 600;
        font-size: 1.3em;
        line-height: 1;
    }

    .preco {
        font-weight: 300;
    }

    button {
        border: none;
        cursor: pointer;
    }

</style>