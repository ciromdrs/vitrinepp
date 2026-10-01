<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import Descricao from '@/components/Descricao.vue'
import MarcaDestaques from '@/components/MarcaDestaques.vue'
import RoupaContainer from '@/components/RoupaContainer.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorDisplay from '@/components/common/ErrorDisplay.vue'
import MarcaDetails from '../MarcaDetails.vue'
import { useMarcas } from '@/composables/useMarcas'

const route = useRoute()

const { marcas, carregarMarca, carregarRoupasDaMarca } = useMarcas()

const marca = ref(null)
const roupas = ref([])
const roupasDestaque = ref([])
const isLoading = ref(true)
const error = ref(null)

const carregarDados = async () => {
    isLoading.value = true
    error.value = null

    try {
        const nomeMarca = route.params.nome;
        marca.value = await carregarMarca(nomeMarca);

        if (!marca.value) {
            throw new Error('Marca não encontrada')
        }

        roupas.value = await carregarRoupasDaMarca(marca.value.nome)

        roupasDestaque.value = roupas.value.slice(0, 3)

    } catch (err) {
        error.value = err
    } finally {
        isLoading.value = false
    }
}

carregarDados()

watch(
    () => route.params.marca,
    () => {
        carregarDados()
    }
)
</script>
```

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
        
        <!-- Página /marcas/{nome_marca} -->
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