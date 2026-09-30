/**
 * Composable para gerenciar operações com roupas
 */

import { computed, ref } from 'vue'
import { useNotification } from './useNotification'
import { getLinhas } from '@/services/planilha'
import { SHEET_URL } from '@/constants/sheetNames'
import { useApi } from './useApi'
import { parse } from 'papaparse'

export function useRoupas() {
  const roupas = ref([])
  const destaques = ref([])
  const roupaAtual = ref(null)
  const filterBy = ref(null)
  const search = ref(null)
  const { isLoading, error, execute } = useApi()
  const { success } = useNotification()
  let carregamentoRoupas = null
  /**
   * Carrega todas os destaques
   */
  
  const carregarDestaques = async () => {
    isLoading.value = true
    
    try {
      const data = await getLinhas(SHEET_URL.DESTAQUES);
      if (data) destaques.value = data;
      isLoading.value = false
    }
    catch (err){
      error.value = err;
      isLoading.value = false
    }

  }

/**
   * Carrega todas as roupas
   */

  const carregarRoupas = async () => {
    isLoading.value = true;
    try{
      const data = await getLinhas(SHEET_URL.ROUPAS);
      if(data) roupas.value = data;
    } catch (err){
      error.value = err;
    } finally{
      isLoading.value = false;
    }
  }

  /**
   * Carrega uma roupa por ID
   */
  const carregarRoupa = async (id) => {
    await carregarRoupas();
    isLoading.value = true;
    try{
      roupas.value.forEach(r => {
        console.log(typeof(r))
      });
      roupaAtual.value = roupas.value.find((r)=> r.id === id);
    } catch(err){
      error.value = err;
    } finally{
      isLoading.value = false;
    }
  }

  /**
   * Carrega roupas por marca
   */
  const filtrarRoupasMaisRecentes = (roupas) => {
    return roupas.value.sort((a, b) => parseInt(b.id) - parseInt(a.id));
  }
  const filtrarRoupasMaisAntigas = (roupas) => {
    return roupas.value.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  }
  const filtrarRoupasMaisBaratas = (roupas) => {
    return roupas.value.sort((a, b) => parseInt(a.preco) - parseInt(b.preco));
  }
  const filtrarRoupasMaisCaras = (roupas) => {
    return roupas.value.sort((a, b) => parseInt(b.preco) - parseInt(a.preco))
  }
  const filtrarRoupasPorMarca = (marcaNome) => {
    roupas.value = roupas.value.filter(r => r.marca_nome === marcaNome);
    return roupas.value;
  }
  return {
    roupas,
    roupaAtual,
    isLoading,
    filterBy,
    error,
    carregarRoupas,
    carregarRoupa,
    filtrarRoupasMaisBaratas,
    filtrarRoupasMaisCaras,
    filtrarRoupasMaisRecentes,
    filtrarRoupasMaisAntigas,
    filtrarRoupasPorMarca,
    carregarDestaques
  }
}
