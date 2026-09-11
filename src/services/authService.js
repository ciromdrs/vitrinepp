/**
 * Serviço para operações de autenticação
 */

import { api } from './apiService'
import { API_ENDPOINTS } from '@/config/constants'

export const authService = {
  /**
   * Realiza login do usuário
   * @param {string} username - Nome de usuário
   * @param {string} password - Senha
   * @returns {Promise<{data, error}>}
   */
  async login(username, password) {
    return await api.post(API_ENDPOINTS.LOGIN, { username, password })
  },

  /**
   * Realiza logout do usuário
   * @returns {Promise<{data, error}>}
   */
  async logout() {
    return await api.post(API_ENDPOINTS.LOGOUT, {})
  },

  /**
   * Atualiza o token de autenticação
   * @returns {Promise<{data, error}>}
   */
  async refreshToken() {
    return await api.post(API_ENDPOINTS.REFRESH, {})
  },

  /**
   * Verifica se o usuário está autenticado
   * @returns {Promise<boolean>}
   */
  async checkAuth() {
    try {
      const { data, error } = await this.refreshToken()
      return !error && data !== null
    } catch (err) {
      return false
    }
  },

  /**
   * Cria um novo administrador
   * @param {Object} adminData - Dados do admin
   * @returns {Promise<{data, error}>}
   */
  async createAdmin(adminData) {
    return await api.post(API_ENDPOINTS.ADMIN_CREATE, adminData)
  },

  /**
   * Atualiza dados de um administrador
   * @param {number|string} id - ID do admin
   * @param {Object} adminData - Dados atualizados
   * @returns {Promise<{data, error}>}
   */
  async updateAdmin(id, adminData) {
    return await api.put(API_ENDPOINTS.ADMIN_UPDATE(id), adminData)
  },

  /**
   * Deleta um administrador
   * @param {number|string} id - ID do admin
   * @returns {Promise<{data, error}>}
   */
  async deleteAdmin(id) {
    return await api.delete(API_ENDPOINTS.ADMIN_DELETE(id))
  },
}
