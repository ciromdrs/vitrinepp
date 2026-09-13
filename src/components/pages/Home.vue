<script>
import Destaques from '../Destaques.vue'
import Carrossel from '../Carrossel.vue'
import Conecte from '../Conecte.vue'
import Descubra from '../Descubra.vue'
import LoadingSpinner from '../common/LoadingSpinner.vue'
import ErrorDisplay from '../common/ErrorDisplay.vue'
import { destaques, roupas as roupasData } from '../../data/roupas'

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
  created() {
    this.destaques = [...destaques]
    this.roupas = [...roupasData]
    this.isLoading = false
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