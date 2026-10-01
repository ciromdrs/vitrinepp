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
  const { isLoading, error } = useApi();
  const { success } = useNotification();
  const {carregarRoupas, roupas } = useRoupas();
  /**
   * Carrega todas as marcas
   */
  const carregarMarcas = async () => {
    isLoading.value = true;
    try {
      const data = await getLinhas(SHEET_URL.MARCAS);
      if (data) marcas.value = data;
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
  const carregarMarca = async (nomeMarca) => {
    await carregarMarcas()
    isLoading.value = true;
    try{
      const data  = marcas.value.find((m) => m.nome === nomeMarca);
      marcas.value.forEach(element => {
        console.log(element.nome)
      });
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
    return roupas.value.filter(r => r.marca === nomeMarca);
    
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
