/**
 * Composable para validação de formulários
 */

import { ref, reactive, computed } from 'vue'

export function useFormValidation(initialValues = {}, rules = {}) {
  const values = reactive({ ...initialValues })
  const errors = reactive({})
  const touched = reactive({})
  const isSubmitting = ref(false)

  /**
   * Regras de validação comuns
   */
  const validators = {
    required: (value) => {
      if (value === null || value === undefined || value === '') {
        return 'Este campo é obrigatório'
      }
      return null
    },

    email: (value) => {
      if (!value) return null
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return 'Email inválido'
      }
      return null
    },

    minLength: (min) => (value) => {
      if (!value) return null
      if (value.length < min) {
        return `Mínimo de ${min} caracteres`
      }
      return null
    },

    maxLength: (max) => (value) => {
      if (!value) return null
      if (value.length > max) {
        return `Máximo de ${max} caracteres`
      }
      return null
    },

    min: (min) => (value) => {
      if (value === null || value === undefined) return null
      if (Number(value) < min) {
        return `Valor mínimo: ${min}`
      }
      return null
    },

    max: (max) => (value) => {
      if (value === null || value === undefined) return null
      if (Number(value) > max) {
        return `Valor máximo: ${max}`
      }
      return null
    },

    url: (value) => {
      if (!value) return null
      try {
        new URL(value)
        return null
      } catch {
        return 'URL inválida'
      }
    },

    pattern: (regex, message = 'Formato inválido') => (value) => {
      if (!value) return null
      if (!regex.test(value)) {
        return message
      }
      return null
    },
  }

  /**
   * Valida um campo específico
   */
  const validateField = (fieldName) => {
    const fieldRules = rules[fieldName]
    if (!fieldRules) return

    const fieldValue = values[fieldName]
    
    for (const rule of fieldRules) {
      const error = rule(fieldValue)
      if (error) {
        errors[fieldName] = error
        return
      }
    }
    
    delete errors[fieldName]
  }

  /**
   * Valida todos os campos
   */
  const validateAll = () => {
    Object.keys(rules).forEach(validateField)
    return Object.keys(errors).length === 0
  }

  /**
   * Marca um campo como tocado
   */
  const touchField = (fieldName) => {
    touched[fieldName] = true
  }

  /**
   * Handler para blur de input
   */
  const handleBlur = (fieldName) => {
    touchField(fieldName)
    validateField(fieldName)
  }

  /**
   * Handler para change de input
   */
  const handleChange = (fieldName, value) => {
    values[fieldName] = value
    if (touched[fieldName]) {
      validateField(fieldName)
    }
  }

  /**
   * Reseta o formulário
   */
  const resetForm = () => {
    Object.keys(values).forEach(key => {
      values[key] = initialValues[key]
    })
    Object.keys(errors).forEach(key => {
      delete errors[key]
    })
    Object.keys(touched).forEach(key => {
      touched[key] = false
    })
    isSubmitting.value = false
  }

  /**
   * Define valores do formulário
   */
  const setValues = (newValues) => {
    Object.assign(values, newValues)
  }

  /**
   * Define um erro manualmente
   */
  const setError = (fieldName, error) => {
    errors[fieldName] = error
  }

  /**
   * Limpa erro de um campo
   */
  const clearError = (fieldName) => {
    delete errors[fieldName]
  }

  /**
   * Verifica se o formulário é válido
   */
  const isValid = computed(() => {
    return Object.keys(errors).length === 0
  })

  /**
   * Verifica se o formulário foi modificado
   */
  const isDirty = computed(() => {
    return Object.keys(values).some(key => {
      return values[key] !== initialValues[key]
    })
  })

  /**
   * Wrapper para submit
   */
  const handleSubmit = async (submitFn) => {
    // Marca todos os campos como tocados
    Object.keys(rules).forEach(key => {
      touched[key] = true
    })

    // Valida todos os campos
    if (!validateAll()) {
      return
    }

    isSubmitting.value = true
    try {
      await submitFn(values)
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,
    validators,
    validateField,
    validateAll,
    touchField,
    handleBlur,
    handleChange,
    resetForm,
    setValues,
    setError,
    clearError,
    handleSubmit,
  }
}
