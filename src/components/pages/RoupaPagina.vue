<script>
import RoupaDetalhes from '../RoupaDetalhes.vue';
import Historico from '../Historico.vue';
import Recomendados from '../Recomendados.vue';
import LoadingSpinner from '../common/LoadingSpinner.vue';
import ErrorDisplay from '../common/ErrorDisplay.vue';
import { useRoupas } from '@/composables/useRoupas';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
  components: {
    RoupaDetalhes,
    Historico,
    Recomendados,
    LoadingSpinner,
    ErrorDisplay
  },
  setup() {
    const route = useRoute();
    const { roupaAtual, isLoading, error, carregarRoupa } = useRoupas();

    const carregarDados = async () => {
      const id = Number(route.params.id);
      if (id) {
        await carregarRoupa(id);
      }
    };

    onMounted(() => {
      carregarDados();
    });

    // Recarrega quando a rota muda
    watch(() => route.params.id, () => {
      if (route.params.id) {
        carregarDados();
      }
    });

    return {
      roupa: roupaAtual,
      isLoading,
      error,
      carregarDados
    };
  }
}
</script>


<template>
  <main>
    <LoadingSpinner :isLoading="isLoading" message="Carregando roupa..." />
    
    <ErrorDisplay 
      v-if="error && !isLoading" 
      :error="error"
      :showRetry="true"
      @retry="carregarDados"
    />
    
    <RoupaDetalhes :roupa="roupa" v-if="roupa && !isLoading"></RoupaDetalhes>
    
    <div v-if="!roupa && !isLoading && !error" class="not-found">
      <h1>Roupa não encontrada</h1>
      <p>A roupa que você procura não existe ou foi removida.</p>
    </div>
    
    <!-- <Recomendados></Recomendados> -->
    <!-- <Historico></Historico> -->
  </main>
</template>

<style scoped>
main {
  padding: 0 2em;
  margin: 2em 0;
  display: flex;
  flex-direction: column;
  gap: 2em;
}

.not-found {
  text-align: center;
  padding: 3em 0;
}

.not-found h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
  color: #333;
}

.not-found p {
  font-size: 1.1em;
  color: #666;
}

@media screen and (max-width: 400px) {
  main {
    padding: 0 .25em;
  }
}
</style>
