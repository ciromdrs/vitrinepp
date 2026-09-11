/**
 * Composable para gerenciar estado de autenticação
 */

import { ref, computed } from 'vue'
import { authService } from '@/services/authService'
import { useNotification } from './useNotification'

const isAuthenticated = ref(false)
const isLoading = ref(false)
const user = ref(null)

export function useAuth() {
  const { success, error } = useNotification()

  /**
   * Realiza login
   */
  const login = async (username, password) => {
    isLoading.value = true
    
    const { data, error: apiError } = await authService.login(username, password)
    
    isLoading.value = false
    
    if (apiError) {
      error(apiError.message)
      return { success: false, error: apiError }
    }
    
    isAuthenticated.value = true
    user.value = data.user || null
    success('Login realizado com sucesso!')
    
    return { success: true, data }
  }

  /**
   * Realiza logout
   */
  const logout = async () => {
    isLoading.value = true
    
    const { error: apiError } = await authService.logout()
    
    isLoading.value = false
    
    if (apiError) {
      error(apiError.message)
    } else {
      success('Logout realizado com sucesso!')
    }
    
    isAuthenticated.value = false
    user.value = null
  }

  /**
   * Verifica autenticação
   */
  const checkAuth = async () => {
    isLoading.value = true
    const authenticated = await authService.checkAuth()
    isAuthenticated.value = authenticated
    isLoading.value = false
    return authenticated
  }

  /**
   * Estado computado
   */
  const isLoggedIn = computed(() => isAuthenticated.value)

  return {
    isAuthenticated,
    isLoading,
    user,
    isLoggedIn,
    login,
    logout,
    checkAuth,
  }
}
