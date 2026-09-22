/**
 * Composable para gerenciar operações com marcas
 */

import { ref } from 'vue'
import { useNotification } from './useNotification'
import {getLinhas} from '@/services/planilha'
import { SHEET_NAMES } from '@/constants/sheetNames'
import { carregarRoupasPorMarca } from '@/composables/useRoupas'
export function useMarcas() {
  const marcas = ref([])
  const marcaAtual = ref(null)
  const { success } = useNotification()

  /**
   * Carrega todas as marcas
   */
  const carregarMarcas = async () => {
    const rows = await  getLinhas(SHEET_NAMES.MARCASS);
    let list_marcas = [];

    rows.forEach(m => {
      let marca = {
        id: m[0],
        nome: m[1],
        banner: m[2],
        fotoPerfil: m[3],
        descricao: m[4],
        roupas: carregarRoupasPorMarca(),
        telefone: m[5]
      };

      list_marcas.push(marca);
    });

    marcas.value = list_marcas;

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
