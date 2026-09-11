/**
 * Serviço para operações relacionadas a marcas
 */

import { api } from './apiService'
import { API_ENDPOINTS } from '@/config/constants'

export const marcasService = {
  /**
   * Busca todas as marcas
   * @param {Object} params - Parâmetros de query (filtros, paginação, etc)
   * @returns {Promise<{data, error}>}
   */
  async getAll(params = {}) {
    return await api.get(API_ENDPOINTS.MARCAS, { params })
  },

  /**
   * Busca uma marca por ID
   * @param {number|string} id - ID da marca
   * @returns {Promise<{data, error}>}
   */
  async getById(id) {
    return await api.get(API_ENDPOINTS.MARCA_DETAIL(id))
  },

  /**
   * Cria uma nova marca
   * @param {Object|FormData} marcaData - Dados da marca
   * @returns {Promise<{data, error}>}
   */
  async create(marcaData) {
    const config = marcaData instanceof FormData ? {
      headers: { 'Content-Type': 'multipart/form-data' }
    } : {}
    
    return await api.post(API_ENDPOINTS.MARCA_CREATE, marcaData, config)
  },

  /**
   * Atualiza uma marca existente
   * @param {number|string} id - ID da marca
   * @param {Object|FormData} marcaData - Dados atualizados
   * @returns {Promise<{data, error}>}
   */
  async update(id, marcaData) {
    const config = marcaData instanceof FormData ? {
      headers: { 'Content-Type': 'multipart/form-data' }
    } : {}
    
    return await api.put(API_ENDPOINTS.MARCA_UPDATE(id), marcaData, config)
  },

  /**
   * Deleta uma marca
   * @param {number|string} id - ID da marca
   * @returns {Promise<{data, error}>}
   */
  async delete(id) {
    return await api.delete(API_ENDPOINTS.MARCA_DELETE(id))
  },

  /**
   * Busca roupas de uma marca específica
   * @param {number|string} id - ID da marca
   * @returns {Promise<{data, error}>}
   */
  async getRoupas(id) {
    return await api.get(API_ENDPOINTS.MARCA_ROUPAS(id))
  },
}
