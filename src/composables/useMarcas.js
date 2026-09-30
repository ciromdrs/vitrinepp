/**
 * Composable para gerenciar operações com marcas
 */

import { ref } from 'vue'
import { useNotification } from './useNotification'
import {getLinhas} from '@/services/planilha'
import { SHEET_URL } from '@/constants/sheetNames'
import { useRoupas } from '@/composables/useRoupas'
import { useApi } from './useApi'

export function useMarcas() {
  const marcas = ref([]);
  const marcaAtual = ref(null);
  const { isLoading, error, execute } = useApi();
  const { success } = useNotification();
  const {carregarRoupas} = useRoupas();
  /**
   * Carrega todas as marcas
   */
  const carregarMarcas = async () => {
    isLoading.value = true;
    try {
      const data = await getLinhas(SHEET_URL.MARCAS);
      if (data) destaques.value = data;
    }
    catch (err){
      error.value = err;
    } finally{
      isLoading.value = false
    }
  }

  /**
   * Carrega uma marca por ID
   */
  const carregarMarca = async (id) => {
    await carregarMarcas()
    isLoading.value = true;
    try{
      const data  = marcas.find(r => r.id === id);
      return data; 
    } catch(err){
      error.value = err;
    } finally{
      isLoading.value = false;
    }
  }

  /**
   * Carrega roupas de uma marca
   */
  const carregarRoupasDaMarca = async (nomeMarca) => {
    await carregarRoupas()
    return roupas.filter(r => r.marca === nomeMarca);
    
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
