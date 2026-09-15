/**
 * Composable para gerenciar operações com marcas
 */

import { ref } from 'vue'
import { useNotification } from './useNotification'

export function useMarcas() {
  const marcas = ref([])
  const marcaAtual = ref(null)
  const { isLoading, error, execute } = useApi()
  const { success } = useNotification()

  /**
   * Carrega todas as marcas
   */
  const carregarMarcas = async (params = {}) => {
    const { data } = await execute(() => marcasService.getAll(params))
    
    if (data) {
      marcas.value = data
    }
    
    return data
  }

  /**
   * Carrega uma marca por ID
   */
  const carregarMarca = async (id) => {
    const { data } = await execute(() => marcasService.getById(id))
    
    if (data) {
      marcaAtual.value = data
    }
    
    return data
  }

  /**
   * Carrega roupas de uma marca
   */
  const carregarRoupasDaMarca = async (id) => {
    const { data } = await execute(() => marcasService.getRoupas(id))
    return data
  }

  return {
    marcas,
    marcaAtual,
    isLoading,
    error,
    carregarMarcas,
    carregarMarca,
    carregarRoupasDaMarca,
  }
}
