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
   * Cria uma nova roupa
   */
  const criarRoupa = async (roupaData) => {
    const { data } = await execute(
      () => roupasService.create(roupaData),
      {
        onSuccess: () => success('Roupa criada com sucesso!'),
      }
    )
    
    if (data) {
      roupas.value.push(data)
    }
    
    return data
  }

  /**
   * Atualiza uma roupa
   */
  const atualizarRoupa = async (id, roupaData) => {
    const { data } = await execute(
      () => roupasService.update(id, roupaData),
      {
        onSuccess: () => success('Roupa atualizada com sucesso!'),
      }
    )
    
    if (data) {
      const index = roupas.value.findIndex(r => r.id === id)
      if (index !== -1) {
        roupas.value[index] = data
      }
      roupaAtual.value = data
    }
    
    return data
  }

  /**
   * Deleta uma roupa
   */
  const deletarRoupa = async (id) => {
    const { data } = await execute(
      () => roupasService.delete(id),
      {
        onSuccess: () => success('Roupa deletada com sucesso!'),
      }
    )
    
    if (data !== null) {
      roupas.value = roupas.value.filter(r => r.id !== id)
      if (roupaAtual.value?.id === id) {
        roupaAtual.value = null
      }
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
    criarRoupa,
    atualizarRoupa,
    deletarRoupa,
    carregarRoupasPorMarca,
  }
}
