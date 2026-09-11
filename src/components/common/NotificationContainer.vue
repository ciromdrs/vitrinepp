<template>
  <transition-group 
    name="notification-list" 
    tag="div" 
    class="notification-container"
  >
    <div
      v-for="notification in notifications"
      :key="notification.id"
      :class="['notification', `notification--${notification.type}`]"
      @click="removeNotification(notification.id)"
    >
      <div class="notification__icon">
        <span v-if="notification.type === 'success'">✓</span>
        <span v-else-if="notification.type === 'error'">✕</span>
        <span v-else-if="notification.type === 'warning'">⚠</span>
        <span v-else>ℹ</span>
      </div>
      <div class="notification__content">
        <p>{{ notification.message }}</p>
      </div>
      <button 
        class="notification__close"
        @click.stop="removeNotification(notification.id)"
        aria-label="Fechar notificação"
      >
        ×
      </button>
    </div>
  </transition-group>
</template>

<script>
import { useNotification } from '@/composables/useNotification'

export default {
  name: 'NotificationContainer',
  setup() {
    const { notifications, removeNotification } = useNotification()
    
    return {
      notifications,
      removeNotification,
    }
  },
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
  pointer-events: none;
}

.notification {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: white;
  border-left: 4px solid;
  cursor: pointer;
  pointer-events: all;
  transition: all 0.3s ease;
  animation: slideIn 0.3s ease;
}

.notification:hover {
  transform: translateX(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.notification__icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: bold;
  font-size: 16px;
}

.notification__content {
  flex: 1;
  min-width: 0;
}

.notification__content p {
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  color: #333;
  word-wrap: break-word;
}

.notification__close {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  color: #666;
  transition: color 0.2s;
  padding: 0;
}

.notification__close:hover {
  color: #000;
}

/* Tipos de notificação */
.notification--success {
  border-left-color: #10b981;
}

.notification--success .notification__icon {
  background: #d1fae5;
  color: #10b981;
}

.notification--error {
  border-left-color: #ef4444;
}

.notification--error .notification__icon {
  background: #fee2e2;
  color: #ef4444;
}

.notification--warning {
  border-left-color: #f59e0b;
}

.notification--warning .notification__icon {
  background: #fef3c7;
  color: #f59e0b;
}

.notification--info {
  border-left-color: #3b82f6;
}

.notification--info .notification__icon {
  background: #dbeafe;
  color: #3b82f6;
}

/* Animações */
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.notification-list-enter-active {
  animation: slideIn 0.3s ease;
}

.notification-list-leave-active {
  animation: slideOut 0.3s ease;
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

.notification-list-move {
  transition: transform 0.3s ease;
}

/* Responsivo */
@media (max-width: 640px) {
  .notification-container {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
  
  .notification {
    padding: 12px;
  }
  
  .notification__content p {
    font-size: 13px;
  }
}
</style>
