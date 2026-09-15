/**
 * Composable para gerenciar operações com roupas
 */

import { ref } from 'vue'
import { useNotification } from './useNotification'

export function useRoupas() {
  const roupas = ref([])
  const roupaAtual = ref(null)
  const { isLoading, error, execute } = useApi()
  const { success } = useNotification()

  /**
   * Carrega todas as roupas
   */
  const carregarRoupas = async (params = {}) => {
    const { data } = await execute(() => roupasService.getAll(params))
    
    if (data) {
      // Se a API retorna paginação, pega o array results
      roupas.value = data.results || data
    }
    
    return data
  }

  /**
   * Carrega uma roupa por ID
   */
  const carregarRoupa = async (id) => {
    const { data } = await execute(() => roupasService.getById(id))
    
    if (data) {
      roupaAtual.value = data
    }
    
    return data
  }

  /**
   * Carrega roupas por marca
   */
  const carregarRoupasPorMarca = async (marcaId) => {
    const { data } = await execute(() => roupasService.getByMarca(marcaId))
    
    if (data) {
      roupas.value = data
    }
    
    return data
  }

  return {
    roupas,
    roupaAtual,
    isLoading,
    error,
    carregarRoupas,
    carregarRoupa,
    carregarRoupasPorMarca,
  }
}
