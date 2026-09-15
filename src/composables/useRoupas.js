/**
 * Composable para gerenciar operações com roupas
 */

import { ref } from 'vue'
import { useNotification } from './useNotification'
import { getLinhas } from '@/services/planilha'
import { SHEET_NAMES } from '@/constants/sheetNames'

export function useRoupas() {
  const roupas = ref([])
  const roupaAtual = ref(null)
  const { success } = useNotification()

  /**
   * Carrega todas as roupas
   */
  const carregarRoupas = async () => {
    const rows = await getLinhas(SHEET_NAMES.ROUPAS);
    let list_roupas = [];

    rows.forEach(r => {
      let roupa = {
        id: r[0],
        nome: r[1],
        descricao: r[2],
        preco: r[3],
        img: r[4],
        extraImgs: r[5],
        marca_nome: r[6],
        marca_email: r[7],
        tamanhos: r[8]
      };

      list_roupas.push(roupa);
    });

    roupas.value = list_roupas;

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
    await carregarRoupas(SHEET_NAMES.ROUPAS);

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
