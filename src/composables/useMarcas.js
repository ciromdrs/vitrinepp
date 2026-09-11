/**
 * Composable para gerenciar operações com marcas
 */

import { ref } from 'vue'
import { marcasService } from '@/services/marcasService'
import { useApi } from './useApi'
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
   * Cria uma nova marca
   */
  const criarMarca = async (marcaData) => {
    const { data } = await execute(
      () => marcasService.create(marcaData),
      {
        onSuccess: () => success('Marca criada com sucesso!'),
      }
    )
    
    if (data) {
      marcas.value.push(data)
    }
    
    return data
  }

  /**
   * Atualiza uma marca
   */
  const atualizarMarca = async (id, marcaData) => {
    const { data } = await execute(
      () => marcasService.update(id, marcaData),
      {
        onSuccess: () => success('Marca atualizada com sucesso!'),
      }
    )
    
    if (data) {
      const index = marcas.value.findIndex(m => m.id === id)
      if (index !== -1) {
        marcas.value[index] = data
      }
      marcaAtual.value = data
    }
    
    return data
  }

  /**
   * Deleta uma marca
   */
  const deletarMarca = async (id) => {
    const { data } = await execute(
      () => marcasService.delete(id),
      {
        onSuccess: () => success('Marca deletada com sucesso!'),
      }
    )
    
    if (data !== null) {
      marcas.value = marcas.value.filter(m => m.id !== id)
      if (marcaAtual.value?.id === id) {
        marcaAtual.value = null
      }
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
    criarMarca,
    atualizarMarca,
    deletarMarca,
    carregarRoupasDaMarca,
  }
}
