<script>
import DeleteModal from './DeleteModal.vue';
import MarcasContainer from './MarcasContainer.vue'
import axios from 'axios'

export default {
    created() {
        let endpoint = this.baseURL + 'marcas/'
        axios.get(endpoint).then(response => {
            console.log(response.data)
            this.marcas = response.data.results
        }).catch(error => {
            console.log(error)
        })
    },
    components: {
        DeleteModal,
        MarcasContainer
    },
    props: {
        editar: Boolean,
        deletar: Boolean
    },
    data() {
        return {
            marcas: null,
            deleteModalShowing: false,
            marcaADeletar: undefined
        }
    },
    watch: { // abrir modal qnd selecionar marca pra deletar
        marcaADeletar(novaMarca) {
            if (novaMarca) this.deleteModalShowing = true;
        },
        deleteModalShowing(newValue) {
            if (!newValue) this.marcaADeletar = undefined; // reseta a marca ao fechar popup
        }
    },
    methods: {
        goBack() {
            window.location.href = window.location.origin + '/adm'
        },
        selecionarMarca(marca) {
            this.marcaADeletar = marca;
        }
    }
}
</script>

<template>
    <section class="selecionar">
        <button @click="goBack">Voltar</button>
        <h1 v-if="marcas">Selecionar marca a {{ editar ? 'editar' : 'deletar' }}</h1>
        <MarcasContainer v-if="marcas" :marcas :editar :deletar
            @selecionarMarca="selecionarMarca"></MarcasContainer>
        <h1 v-else>Sem marcas disponíveis</h1>
        <DeleteModal v-model="deleteModalShowing" :marcaADeletar></DeleteModal>
    </section>
</template>

<style scoped>
main {
    gap: 1em;
}

a, button {
    color: var(--rosewood-light);
    font-size: 1.25em;
    width: fit-content;
    font-family: "Degular";
    border: none;
    cursor: pointer;
    text-decoration: underline;
    background: transparent;
    &:hover {color: var(--rosewood);}
}

.dark main button {
    color: var(--off-white);
    &:hover { color: var(--rosewood-light); }
}

h2 {
    text-align: center;
}
</style>