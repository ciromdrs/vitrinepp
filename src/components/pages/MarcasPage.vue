<script>
import MarcasContainer from '../MarcasContainer.vue';
import MarcasPop from '../MarcasPop.vue';
import LoadingSpinner from '../common/LoadingSpinner.vue';
import ErrorDisplay from '../common/ErrorDisplay.vue';
import axios from 'axios';

export default {
    components: {
        MarcasContainer,
        MarcasPop,
        LoadingSpinner,
        ErrorDisplay
    },
    data() {
        return {
            marcas: [],
            populares: [],
            isLoading: true,
            error: null
        }
    },
    created() {
        this.carregarMarcas()
    },
    methods: {
        async carregarMarcas() {
            this.isLoading = true
            this.error = null
            
            try {
                // Marcas normal
                let endpoint = this.baseURL + 'marcas/'
                const responseMarcas = await axios.get(endpoint)
                this.marcas = responseMarcas.data.results || []

                // Populares (4 mais visitadas)
                endpoint = this.baseURL + 'marcas/mais-visitadas/'
                const responsePopulares = await axios.get(endpoint)
                this.populares = responsePopulares.data || []
            } catch (error) {
                console.error('Erro ao carregar marcas:', error)
                this.marcas = []
                this.populares = []
                this.error = error.response?.data?.detail || error.response?.data?.message || error.message || 'Erro ao carregar marcas. Verifique sua conexão.'
            } finally {
                this.isLoading = false
            }
        }
    }
}
</script>

<template>
    <main>
        <LoadingSpinner 
            v-if="isLoading" 
            :isLoading="true" 
            :overlay="false" 
            message="Carregando marcas..." 
        />
        
        <ErrorDisplay 
            v-if="error && !isLoading" 
            :error="error"
            title="Erro ao carregar marcas"
            type="error"
            :showRetry="true"
            @retry="carregarMarcas"
        />
        
        <template v-if="!isLoading && !error">
            <MarcasPop v-if="populares.length > 0" :marcas="populares"></MarcasPop>
            <section class="all">
                <h2>Todas as marcas</h2>
                <MarcasContainer v-if="marcas.length > 0" :marcas="marcas"></MarcasContainer>
                <p v-else class="empty-message">Nenhuma marca encontrada.</p>
            </section>
        </template>
    </main>
</template>

<style scoped>
    .all {
        display: flex;
        flex-direction: column;
        gap: 1em;
        h2 {
            line-height: 1;
            text-transform: uppercase;
            font-size: 1.75em;
        }
    }
    
    .empty-message {
        text-align: center;
        color: var(--subtext);
        font-size: 1.2em;
        padding: 2em;
    }
</style>