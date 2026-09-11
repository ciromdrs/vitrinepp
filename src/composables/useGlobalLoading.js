/**
 * Composable para gerenciar estado de loading global
 */

import { ref } from 'vue'

// Estado compartilhado entre todas as instâncias
const isLoading = ref(false)
const loadingMessage = ref('')
const loadingCount = ref(0)

export function useGlobalLoading() {
  /**
   * Inicia o loading
   * @param {string} message - Mensagem opcional para exibir
   */
  const startLoading = (message = '') => {
    loadingCount.value++
    isLoading.value = true
    if (message) {
      loadingMessage.value = message
    }
  }

  /**
   * Para o loading
   */
  const stopLoading = () => {
    loadingCount.value = Math.max(0, loadingCount.value - 1)
    
    if (loadingCount.value === 0) {
      isLoading.value = false
      loadingMessage.value = ''
    }
  }

  /**
   * Força parar todo loading
   */
  const forceStopLoading = () => {
    loadingCount.value = 0
    isLoading.value = false
    loadingMessage.value = ''
  }

  /**
   * Wrapper para executar função com loading
   * @param {Function} fn - Função async para executar
   * @param {string} message - Mensagem de loading
   */
  const withLoading = async (fn, message = '') => {
    startLoading(message)
    try {
      return await fn()
    } finally {
      stopLoading()
    }
  }

  return {
    isLoading,
    loadingMessage,
    startLoading,
    stopLoading,
    forceStopLoading,
    withLoading,
  }
}
