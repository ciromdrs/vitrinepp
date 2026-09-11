<script>
import Destaques from '../Destaques.vue'
import Carrossel from '../Carrossel.vue'
import Conecte from '../Conecte.vue'
import Descubra from '../Descubra.vue'
import LoadingSpinner from '../common/LoadingSpinner.vue'
import ErrorDisplay from '../common/ErrorDisplay.vue'
import { destaques } from '../../data/roupas'
import axios from 'axios';

export default {
  components: {
    Destaques,
    Carrossel,
    Conecte,
    Descubra,
    LoadingSpinner,
    ErrorDisplay
  },
  data() {
    return {
      destaques: [],
      roupas: [],
      isLoading: true,
      error: null
    }
  },
  async created() {
    await this.carregarDados()
  },
  methods: {
    async carregarDados() {
      this.isLoading = true
      this.error = null
      
      try {
        const endpoint = this.baseURL + 'roupas/home/'
        const response = await axios.get(endpoint)
        console.log(response.data)
        this.destaques = response.data.destaques || []
        this.roupas = response.data.outros || []
      } catch (error) {
        console.error('Erro ao carregar home:', error)
        this.destaques = []
        this.roupas = []
        this.error = error.response?.data?.detail || error.response?.data?.message || error.message || 'Erro ao carregar página inicial. Verifique sua conexão.'
      } finally {
        this.isLoading = false
      }
    }
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