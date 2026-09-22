/**
 * Composable para gerenciar operações com marcas
 */

import { ref } from 'vue'
import { useNotification } from './useNotification'
import {getLinhas} from '@/services/planilha'
import { SHEET_URL } from '@/constants/sheetNames'
import { carregarRoupasPorMarca } from '@/composables/useRoupas'
import { useApi } from './useApi'

export function useMarcas() {
  const marcas = ref([])
  const marcaAtual = ref(null)
  const { isLoading, error, execute } = useApi()
  const { success } = useNotification()

  /**
   * Carrega todas as marcas
   */
  const carregarMarcas = async () => {
    const marcas = await getLinhas(SHEET_URL.MARCAS);
    return marcas;
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
  const carregarRoupasDaMarca = async (nomeMarca) => {
    const data = await carregarRoupasPorMarca(nomeMarca)
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
