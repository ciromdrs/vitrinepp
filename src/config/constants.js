/**
 * Constantes e configurações da aplicação
 */

// URL base da API - pode ser configurada via variável de ambiente
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://testeapi-jabb.onrender.com/'

// Endpoints da API
export const API_ENDPOINTS = {
  // Autenticação
  LOGIN: '/usuarios/login/',
  REFRESH: '/usuarios/refresh/',
  LOGOUT: '/usuarios/logout/',
  
  // Roupas
  ROUPAS: '/roupas/produtos/',
  ROUPA_DETAIL: (id) => `/roupas/produtos/${id}/`,
  ROUPA_CREATE: '/roupas/produtos/',
  ROUPA_UPDATE: (id) => `/roupas/produtos/${id}/`,
  ROUPA_DELETE: (id) => `/roupas/produtos/${id}/`,
  
  // Marcas
  MARCAS: '/marcas/',
  MARCA_DETAIL: (id) => `/marcas/${id}/`,
  MARCA_CREATE: '/marcas/',
  MARCA_UPDATE: (id) => `/marcas/${id}/`,
  MARCA_DELETE: (id) => `/marcas/${id}/`,
  MARCA_ROUPAS: (id) => `/marcas/${id}/produtos/`,
  
  // Admin
  ADMIN_CREATE: '/admin/create/',
  ADMIN_UPDATE: (id) => `/admin/${id}/`,
  ADMIN_DELETE: (id) => `/admin/${id}/`,
}

// Mensagens de erro
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
  UNAUTHORIZED: 'Sessão expirada. Faça login novamente.',
  FORBIDDEN: 'Você não tem permissão para esta ação.',
  NOT_FOUND: 'Recurso não encontrado.',
  SERVER_ERROR: 'Erro no servidor. Tente novamente mais tarde.',
  VALIDATION_ERROR: 'Dados inválidos. Verifique os campos.',
  UNKNOWN_ERROR: 'Erro inesperado. Tente novamente.',
}

// Mensagens de sucesso
export const SUCCESS_MESSAGES = {
  LOGIN: 'Login realizado com sucesso!',
  LOGOUT: 'Logout realizado com sucesso!',
  CREATED: 'Criado com sucesso!',
  UPDATED: 'Atualizado com sucesso!',
  DELETED: 'Deletado com sucesso!',
}

// Configurações de timeout
export const TIMEOUT = {
  API_REQUEST: 30000, // 30 segundos
  NOTIFICATION: 5000, // 5 segundos
}

// Tamanhos disponíveis
export const SIZES = ['PP', 'P', 'M', 'G', 'GG', 'XG']
