/**
 * Serviço para operações relacionadas a roupas
 */

import { api } from './apiService'
import { API_ENDPOINTS } from '@/config/constants'

export const roupasService = {
  /**
   * Busca todas as roupas
   * @param {Object} params - Parâmetros de query (filtros, paginação, etc)
   * @returns {Promise<{data, error}>}
   */
  async getAll(params = {}) {
    return await api.get(API_ENDPOINTS.ROUPAS, { params })
  },

  /**
   * Busca uma roupa por ID
   * @param {number|string} id - ID da roupa
   * @returns {Promise<{data, error}>}
   */
  async getById(id) {
    return await api.get(API_ENDPOINTS.ROUPA_DETAIL(id))
  },

  /**
   * Cria uma nova roupa
   * @param {Object|FormData} roupaData - Dados da roupa
   * @returns {Promise<{data, error}>}
   */
  async create(roupaData) {
    const config = roupaData instanceof FormData ? {
      headers: { 'Content-Type': 'multipart/form-data' }
    } : {}
    
    return await api.post(API_ENDPOINTS.ROUPA_CREATE, roupaData, config)
  },

  /**
   * Atualiza uma roupa existente
   * @param {number|string} id - ID da roupa
   * @param {Object|FormData} roupaData - Dados atualizados
   * @returns {Promise<{data, error}>}
   */
  async update(id, roupaData) {
    const config = roupaData instanceof FormData ? {
      headers: { 'Content-Type': 'multipart/form-data' }
    } : {}
    
    return await api.put(API_ENDPOINTS.ROUPA_UPDATE(id), roupaData, config)
  },

  /**
   * Deleta uma roupa
   * @param {number|string} id - ID da roupa
   * @returns {Promise<{data, error}>}
   */
  async delete(id) {
    return await api.delete(API_ENDPOINTS.ROUPA_DELETE(id))
  },

  /**
   * Busca roupas por marca
   * @param {number|string} marcaId - ID da marca
   * @returns {Promise<{data, error}>}
   */
  async getByMarca(marcaId) {
    return await api.get(API_ENDPOINTS.MARCA_ROUPAS(marcaId))
  },
}
