/**
 * Serviço base para chamadas à API
 * Centraliza a configuração do axios e tratamento de erros
 */

import axios from 'axios'
import { API_BASE_URL, ERROR_MESSAGES, TIMEOUT } from '@/config/constants'

// Cria instância do axios com configurações padrão
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT.API_REQUEST,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor de requisição
apiClient.interceptors.request.use(
  (config) => {
    // Aqui você pode adicionar tokens, headers customizados, etc
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor de resposta
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Evita loop infinito: não tenta refresh se a request que falhou já é o próprio refresh
    const isRefreshRequest = originalRequest.url?.includes('/usuarios/refresh/')
    
    // Trata erros de autenticação
    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshRequest) {
      originalRequest._retry = true
      
      // Tenta fazer refresh do token
      try {
        await apiClient.post('/usuarios/refresh/', {})
        return apiClient(originalRequest)
      } catch (refreshError) {
        // Se falhar, redireciona para login
        window.location.href = '/adm'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

/**
 * Classe para tratamento padronizado de erros
 */
export class ApiError extends Error {
  constructor(message, status, data) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

/**
 * Função auxiliar para tratar erros da API
 */
export function handleApiError(error) {
  if (error.response) {
    // Erro com resposta do servidor
    const status = error.response.status
    const data = error.response.data
    
    let message = ERROR_MESSAGES.UNKNOWN_ERROR
    
    switch (status) {
      case 400:
        message = ERROR_MESSAGES.VALIDATION_ERROR
        break
      case 401:
        message = ERROR_MESSAGES.UNAUTHORIZED
        break
      case 403:
        message = ERROR_MESSAGES.FORBIDDEN
        break
      case 404:
        message = ERROR_MESSAGES.NOT_FOUND
        break
      case 500:
      case 502:
      case 503:
        message = ERROR_MESSAGES.SERVER_ERROR
        break
    }
    
    // Se houver mensagem específica do backend, usa ela
    if (data?.message || data?.detail || data?.error) {
      message = data.message || data.detail || data.error
    }
    
    return new ApiError(message, status, data)
  } else if (error.request) {
    // Erro de rede
    return new ApiError(ERROR_MESSAGES.NETWORK_ERROR, null, null)
  } else {
    // Outro tipo de erro
    return new ApiError(error.message || ERROR_MESSAGES.UNKNOWN_ERROR, null, null)
  }
}

/**
 * Métodos HTTP padronizados
 */
export const api = {
  async get(url, config = {}) {
    try {
      const response = await apiClient.get(url, config)
      return { data: response.data, error: null }
    } catch (error) {
      return { data: null, error: handleApiError(error) }
    }
  },

  async post(url, data, config = {}) {
    try {
      const response = await apiClient.post(url, data, config)
      return { data: response.data, error: null }
    } catch (error) {
      return { data: null, error: handleApiError(error) }
    }
  },

  async put(url, data, config = {}) {
    try {
      const response = await apiClient.put(url, data, config)
      return { data: response.data, error: null }
    } catch (error) {
      return { data: null, error: handleApiError(error) }
    }
  },

  async patch(url, data, config = {}) {
    try {
      const response = await apiClient.patch(url, data, config)
      return { data: response.data, error: null }
    } catch (error) {
      return { data: null, error: handleApiError(error) }
    }
  },

  async delete(url, config = {}) {
    try {
      const response = await apiClient.delete(url, config)
      return { data: response.data, error: null }
    } catch (error) {
      return { data: null, error: handleApiError(error) }
    }
  },
}

export default apiClient
