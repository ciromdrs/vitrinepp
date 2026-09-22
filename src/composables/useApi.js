/**
 * Composable genérico para chamadas de API com loading e error states
 */

import { ref } from 'vue'
import { useNotification } from './useNotification'

export function useApi() {
  const isLoading = ref(false)
  const error = ref(null)
  const { error: notifyError } = useNotification()

  /**
   * Executa uma chamada de API com tratamento de estado
   * @param {Function} apiCall - Função que retorna a Promise da API
   * @param {Object} options - Opções de configuração
   */
  const execute = async (apiCall, options = {}) => {
    const {
      showError = true,
      onSuccess = null,
      onError = null,
    } = options

    isLoading.value = true
    error.value = null

    try {
      const { data, error: apiError } = await apiCall()

      if (apiError) {
        error.value = apiError
        
        if (showError) {
          notifyError(apiError.message)
        }
        
        if (onError) {
          onError(apiError)
        }
        
        return { data: null, error: apiError }
      }

      if (onSuccess) {
        onSuccess(data)
      }

      return { data, error: null }
    } catch (err) {
      error.value = err
      
      if (showError) {
        notifyError(err.message || 'Erro inesperado')
      }
      
      if (onError) {
        onError(err)
      }
      
      return { data: null, error: err }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Limpa o erro atual
   */
  const clearError = () => {
    error.value = null
  }

  return {
    isLoading,
    error,
    execute,
    clearError,
  }
}