<script>
import DeleteModal from './DeleteModal.vue';
import RoupaContainer from './RoupaContainer.vue';
import axios from 'axios'
import { authService } from '@/services/authService';

export default {
    async mounted()  {
        const isAuthenticated = await authService.checkAuth();
        console.log(isAuthenticated)
        if(!isAuthenticated) {
            console.log('nao ta autenticado')
            this.$router.replace('/adm')    
        }
    },
    created() {
        // Puxar roupas p/ selecionar
        let endpoint = this.baseURL + 'roupas/produtos/'
        axios.get(endpoint).then(response => {
            console.log(response.data)
            this.roupas = response.data.results
        }).catch(error => {
            console.error(error)
        })
    },
    components: {
        RoupaContainer,
        DeleteModal
    },
    data() {
        return {
            roupas: [],
            deleteModalShowing: false,
            roupaDeletar: undefined
        }
    },
    props: {
        editar: Boolean,
        deletar: Boolean
    },
    watch: { // abrir modal qnd selecionar roupa pra deletar
        roupaDeletar(novaRoupa) {
            if (novaRoupa) this.deleteModalShowing = true;
        },
        deleteModalShowing(newValue) {
            if (!newValue) this.roupaDeletar = undefined; // reseta a roupa ao fechar popup
        }
    },
    methods: {
        goBack() {
            window.location.href = window.location.origin + '/adm'
        },
        selecionarRoupa(novaRoupa) {
            this.roupaDeletar = novaRoupa
        }
    }
}
</script>
<template>
    <section class="selecionar">
        <button @click="goBack">Voltar</button>
        <h1>Selecionar roupa a {{ editar ? 'editar' : 'deletar' }}</h1>
        <RoupaContainer v-if="roupas" :roupas="roupas" :editar :deletar
            :roupaDeletar @selecionarRoupa="selecionarRoupa"></RoupaContainer>
        
        <h2 v-else>Sem roupas disponíveis</h2>
        <DeleteModal v-model="deleteModalShowing" :roupaDeletar></DeleteModal>
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