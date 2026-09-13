<script>
import MarcaDetails from '../MarcaDetails.vue';
import Descricao from '../Descricao.vue';
import MarcaDestaques from '../MarcaDestaques.vue';
import RoupaContainer from '../RoupaContainer.vue';
import LoadingSpinner from '../common/LoadingSpinner.vue';
import ErrorDisplay from '../common/ErrorDisplay.vue';
import { marcas, roupas } from '../../data/roupas'

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
  this.isLoading = true
  this.error = null

  try {
    const id = this.$route.params.id

    this.marca = marcas.find(
      item => String(item.id_marca) === String(id)
    )

    if (!this.marca) {
      throw new Error('Marca não encontrada')
    }

    this.produtos = roupas.filter(
      roupa => roupa.marca === this.marca.nome
    )

    this.topProdutos = this.produtos.slice(0, 3)
  } catch (error) {
    this.error = error
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