<script setup>
import { onErrorCaptured, ref } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import NotificationContainer from './components/common/NotificationContainer.vue'
import ErrorDisplay from './components/common/ErrorDisplay.vue'

// Error boundary - captura erros globais do Vue
const globalError = ref(null)

onErrorCaptured((err, instance, info) => {
  console.error('Global error caught:', err, info)
  globalError.value = {
    message: err.message || 'Ocorreu um erro inesperado',
    stack: err.stack,
    info
  }
  // Retorna false para propagar o erro para o console também
  return false
})

const clearError = () => {
  globalError.value = null
}

const reloadPage = () => {
  window.location.reload()
}
</script>

<template>
  <div id="app-wrapper">
    <Header />
    
    <main class="main-content">
      <!-- Error Boundary Display -->
      <ErrorDisplay
        v-if="globalError"
        :error="globalError"
        title="Erro na aplicação"
        :show-retry="true"
        @retry="reloadPage"
        @dismiss="clearError"
      />
      
      <!-- Router View -->
      <router-view v-slot="{ Component, route }">
        <component :is="Component" :key="route.path" />
      </router-view>
    </main>
    
    <Footer />
    <NotificationContainer />
  </div>
</template>

<style>
  #app-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main-content {
    flex: 1 0 auto;
    padding: 0 2em;
    margin: 2em 0;
    display: flex;
    flex-direction: column;
    gap: 3em;
  }

  @media (max-width: 768px) {
    .main-content {
      padding: 0 1em;
      margin: 1.5em 0;
    }
  }
</style>
