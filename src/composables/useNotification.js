/**
 * Composable para gerenciar notificações no frontend
 */

import { ref } from 'vue'

const notifications = ref([])
let notificationId = 0

export function useNotification() {
  /**
   * Adiciona uma nova notificação
   * @param {string} message - Mensagem da notificação
   * @param {string} type - Tipo: 'success', 'error', 'warning', 'info'
   * @param {number} duration - Duração em ms (0 = permanente)
   */
  const notify = (message, type = 'info', duration = 5000) => {
    const id = ++notificationId
    
    const notification = {
      id,
      message,
      type,
      visible: true,
    }
    
    notifications.value.push(notification)
    
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }
    
    return id
  }

  /**
   * Remove uma notificação
   */
  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index !== -1) {
      notifications.value.splice(index, 1)
    }
  }

  /**
   * Notificações de atalho
   */
  const success = (message, duration) => notify(message, 'success', duration)
  const error = (message, duration) => notify(message, 'error', duration)
  const warning = (message, duration) => notify(message, 'warning', duration)
  const info = (message, duration) => notify(message, 'info', duration)

  /**
   * Limpa todas as notificações
   */
  const clearAll = () => {
    notifications.value = []
  }

  return {
    notifications,
    notify,
    removeNotification,
    success,
    error,
    warning,
    info,
    clearAll,
  }
}
