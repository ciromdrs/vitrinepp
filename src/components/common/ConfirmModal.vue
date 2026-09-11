<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-overlay" @click.self="handleCancel">
        <div class="modal-container" role="dialog" aria-modal="true">
          <div class="modal-header">
            <h3>{{ title }}</h3>
            <button 
              class="modal-close" 
              @click="handleCancel"
              aria-label="Fechar modal"
            >
              ×
            </button>
          </div>
          
          <div class="modal-body">
            <slot>
              <p>{{ message }}</p>
            </slot>
          </div>
          
          <div class="modal-footer">
            <button 
              class="btn btn--secondary" 
              @click="handleCancel"
              :disabled="loading"
            >
              {{ cancelText }}
            </button>
            <button 
              :class="['btn', `btn--${variant}`]" 
              @click="handleConfirm"
              :disabled="loading"
            >
              <span v-if="loading" class="btn-spinner"></span>
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: 'Confirmar ação',
  },
  message: {
    type: String,
    default: '',
  },
  confirmText: {
    type: String,
    default: 'Confirmar',
  },
  cancelText: {
    type: String,
    default: 'Cancelar',
  },
  variant: {
    type: String,
    default: 'primary', // 'primary', 'danger', 'warning'
    validator: (value) => ['primary', 'danger', 'warning'].includes(value),
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('update:modelValue', false)
  emit('cancel')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 1em;
}

.modal-container {
  background: var(--off-main);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5em;
  color: var(--text);
}

.modal-close {
  background: none;
  border: none;
  font-size: 2em;
  color: var(--subtext);
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.1);
  color: var(--text);
}

.modal-body {
  padding: 1.5em;
  color: var(--text);
  line-height: 1.6;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1em;
  padding: 1.5em;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.btn {
  padding: 0.75em 1.5em;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  display: flex;
  align-items: center;
  gap: 0.5em;
  position: relative;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn--primary {
  background-color: var(--rosewood);
  color: white;
}

.btn--primary:hover:not(:disabled) {
  background-color: var(--rosewood-light);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(103, 5, 8, 0.3);
}

.btn--danger {
  background-color: #dc2626;
  color: white;
}

.btn--danger:hover:not(:disabled) {
  background-color: #b91c1c;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.btn--warning {
  background-color: #f59e0b;
  color: white;
}

.btn--warning:hover:not(:disabled) {
  background-color: #d97706;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.btn--secondary {
  background-color: transparent;
  color: var(--text);
  border: 2px solid var(--text);
}

.btn--secondary:hover:not(:disabled) {
  background-color: var(--figure-bg);
}

.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9) translateY(-20px);
}

@media (max-width: 768px) {
  .modal-container {
    margin: 0;
  }

  .modal-footer {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
