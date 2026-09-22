/**
 * Composable para gerenciar operações com roupas
 */

import { ref } from 'vue'
import { useNotification } from './useNotification'
import { getLinhas } from '@/services/planilha'
import { SHEET_URL } from '@/constants/sheetNames'
import { useApi } from './useApi'

export function useRoupas() {
  const roupas = ref([])
  const roupaAtual = ref(null)
  const { isLoading, error, execute } = useApi()
  const { success } = useNotification()

  /**
   * Carrega todas as roupas
   */
  const carregarRoupas = async () => {
    const roupas = await getLinhas(SHEET_URL.ROUPAS);
    return roupas;
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
  const carregarRoupasPorMarca = async (marcaNome) => {
    await carregarRoupas(SHEET_URL.ROUPAS);

    roupas.value = roupas.value.filter(r => r.marca_nome === marcaNome);
    return roupas;
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
