<script>
export default {
    props: {
        marca: Object,
        editar: Boolean, // para páginas ADM
        deletar: Boolean // para páginas ADM
    },
    methods: {
        mudarMarca() { // selecionar marca para deletar
            this.$emit('selecionar-marca', this.marca)
        }
    }
}
</script>

<template>
    <div class="marca" v-if="deletar">
        <figure>
            <button v-if="deletar" @click="mudarMarca">
                <img :src="marca.foto_perfil" alt="Foto da marca">
            </button>
        </figure>
        <button v-if="deletar" @click="mudarMarca">
            <p class="nome">{{ marca.nome }}</p>
        </button>
    </div>
    <div class="marca" v-else>
        <figure>
            <router-link :to="`${editar ? `admEditarMarca/${marca.id_marca}` : `marcas/${marca.id_marca}`}`">
                <img :src="marca.foto_perfil" alt="Foto da marca">
            </router-link>
        </figure>
        <router-link :to="`${editar ? `admEditarMarca/${marca.id_marca}` : `marcas/${marca.id_marca}`}`">
            <p class="nome">{{ marca.nome }}</p>
        </router-link>
    </div>
</template>

<style scoped>
    .marca {
        display: flex;
        flex-direction: column;
        gap: .5em;
        padding: .5em;
        justify-content: center;
        align-items: center;
    }

    figure {
        border-radius: 1000px;
        border: 2px solid var(--text);
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        width: 150px;
        height: 150px;
        aspect-ratio: 1 / 1;

        a, button {
            height: 100%;
            width: 100%;
            border: 0;
        }

        img {
            width: 100%;
            aspect-ratio: 1 / 1;
            transition: 200ms ease;
            &:hover {
                scale: 1.1;
            }
        }
    }

    a, button {
        text-decoration: none;
        cursor: pointer;
        border: none;
        font-family: 'Degular';
        font-size: 1em;
    }

    .nome {
        font-weight: 600;
        font-size: 1.25em;
        color: var(--text);
    }
</style>