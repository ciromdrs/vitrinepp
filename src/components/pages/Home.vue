<script>
import Destaques from '../Destaques.vue'
import Carrossel from '../Carrossel.vue'
import Conecte from '../Conecte.vue'
import Descubra from '../Descubra.vue'
import LoadingSpinner from '../common/LoadingSpinner.vue'
import ErrorDisplay from '../common/ErrorDisplay.vue'
import {useRoupas} from '../../composables/useRoupas.js'

export default {
  components: {
    Destaques,
    Carrossel,
    Conecte,
    Descubra,
    LoadingSpinner,
    ErrorDisplay
  },
  methods: {
  async carregarDados() {
    this.isLoading = true
    this.error = null

    try {
      await this.carregarDestaques()
      await this.carregarRoupas()
    } catch (error) {
      this.error = error
    } finally {
      this.isLoading = false
    }
  }
  },
  setup(){
    const {
      roupas, 
      carregarDestaques,
      carregarRoupas
    } = useRoupas()

    return {
      roupas,
      carregarDestaques,
      carregarRoupas
    }
  },
  data() {
    return {
      destaques: [],
      isLoading: true,
      error: null
    }
  },
  async created() {
    await this.carregarDados()
  }
}
</script>

<template>
  <main class="home">
    <LoadingSpinner 
      v-if="isLoading"
      :isLoading="true" 
      :overlay="false" 
      message="Carregando página inicial..." 
    />
    
    <ErrorDisplay 
      v-if="error && !isLoading" 
      :error="error"
      title="Erro ao carregar página"
      type="error"
      :showRetry="true"
      @retry="carregarDados"
    />
    
    <template v-if="!isLoading && !error">
      <Destaques v-if="destaques.length > 0" :destaques="destaques"></Destaques>
      <Carrossel></Carrossel>
      <Conecte></Conecte>
      <Descubra v-if="roupas.length > 0" :roupas="roupas"></Descubra>
    </template>
  </main>
</template>

<style>
  .home {
    display: flex;
    flex-direction: column;
    gap: 3em;
  }
</style>