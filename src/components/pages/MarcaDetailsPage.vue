<script>
import MarcaDetails from '../MarcaDetails.vue';
import Descricao from '../Descricao.vue';
import MarcaDestaques from '../MarcaDestaques.vue';
import RoupaContainer from '../RoupaContainer.vue';
import LoadingSpinner from '../common/LoadingSpinner.vue';
import ErrorDisplay from '../common/ErrorDisplay.vue';
import axios from 'axios';

export default {
    components: {
        MarcaDetails,
        Descricao,
        MarcaDestaques,
        RoupaContainer,
        LoadingSpinner,
        ErrorDisplay
    },
    data() {
        return{
            marcaId: null,
            marca: null,
            roupas: null,
            roupasDestaque: null,
            isLoading: true,
            error: null
        }
    },
    created() {
        this.carregarDados()
    },
    watch: {
        '$route.params.id'() {
            this.carregarDados()
        }
    },
    methods: {
        async carregarDados() {
            this.marcaId = Number(this.$route.params.id)
            this.isLoading = true
            this.error = null
            
            try {
                console.log(this.marcaId)
                
                // Pegar dados da marca
                let endpoint = this.baseURL + `marcas/${this.marcaId}`
                const responseMarca = await axios.get(endpoint)
                console.log(responseMarca.data)
                this.marca = responseMarca.data

                // Pegar roupas da marca
                endpoint = this.baseURL + `marcas/${this.marcaId}/produtos/`
                const responseRoupas = await axios.get(endpoint)
                console.log(responseRoupas.data)
                this.roupas = responseRoupas.data.length ? responseRoupas.data : null

                // Pegar roupas destaque
                endpoint = this.baseURL + `/marcas/${this.marcaId}/top-3-produtos/`
                try {
                    const responseDestaque = await axios.get(endpoint)
                    this.roupasDestaque = responseDestaque.data.length ? responseDestaque.data : null
                    console.log('roupas destaque: ', responseDestaque.data)
                } catch (destaqueError) {
                    console.warn('Erro ao carregar destaques:', destaqueError)
                    // Não falha a página toda se os destaques falharem
                    this.roupasDestaque = null
                }
            } catch (error) {
                console.error('Erro:', error)
                this.marca = null
                this.roupas = null
                this.roupasDestaque = null
                this.error = error.response?.data?.detail || error.response?.data?.message || error.message || 'Erro ao carregar dados da marca. Verifique sua conexão.'
            } finally {
                this.isLoading = false
            }
        }
    }
}
</script>

<template>
    <div>
        <LoadingSpinner 
            v-if="isLoading"
            :isLoading="true" 
            :overlay="false" 
            message="Carregando marca..." 
        />
        
        <ErrorDisplay 
            v-if="error && !isLoading" 
            :error="error"
            title="Erro ao carregar marca"
            type="error"
            :showRetry="true"
            @retry="carregarDados"
        />
        
        <!-- Página /marcas/{id} -->
        <main v-if="marca && !isLoading && !error">
            <MarcaDetails :marca></MarcaDetails>
            <Descricao :descricao="marca.descricao"></Descricao>
            <MarcaDestaques :nome="marca.nome" v-if="roupasDestaque" :roupas="roupasDestaque"></MarcaDestaques>
            <div class="roupas" v-if="roupas">
                <h2>Tudo de {{ marca.nome }}</h2>
                <RoupaContainer :roupas="roupas"></RoupaContainer>
            </div>
        </main>
    </div>
</template>

<style scoped>
    main {
        display: flex;
        flex-direction: column;
        gap: 1.5em;
    }

    .roupas {
        display: flex;
        flex-direction: column;
        gap: 1em;

        h2 {
            text-transform: uppercase;
            font-size: 2em;
        }
    }
</style>