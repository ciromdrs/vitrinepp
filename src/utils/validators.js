/**
 * Validadores de formulário
 */

/**
 * Valida se o campo é obrigatório
 */
export const required = (value) => {
  if (Array.isArray(value)) {
    return value.length > 0 || 'Campo obrigatório'
  }
  return !!value || 'Campo obrigatório'
}

/**
 * Valida email
 */
export const email = (value) => {
  if (!value) return true
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(value) || 'Email inválido'
}

/**
 * Valida tamanho mínimo
 */
export const minLength = (min) => (value) => {
  if (!value) return true
  return value.length >= min || `Mínimo de ${min} caracteres`
}

/**
 * Valida tamanho máximo
 */
export const maxLength = (max) => (value) => {
  if (!value) return true
  return value.length <= max || `Máximo de ${max} caracteres`
}

/**
 * Valida valor mínimo
 */
export const minValue = (min) => (value) => {
  if (!value) return true
  return Number(value) >= min || `Valor mínimo: ${min}`
}

/**
 * Valida valor máximo
 */
export const maxValue = (max) => (value) => {
  if (!value) return true
  return Number(value) <= max || `Valor máximo: ${max}`
}

/**
 * Valida URL
 */
export const url = (value) => {
  if (!value) return true
  try {
    new URL(value)
    return true
  } catch {
    return 'URL inválida'
  }
}

/**
 * Valida número
 */
export const numeric = (value) => {
  if (!value) return true
  return !isNaN(value) || 'Deve ser um número'
}

/**
 * Valida se é número positivo
 */
export const positive = (value) => {
  if (!value) return true
  return Number(value) > 0 || 'Deve ser um número positivo'
}

/**
 * Valida senha forte
 */
export const strongPassword = (value) => {
  if (!value) return true
  const hasMinLength = value.length >= 8
  const hasUpperCase = /[A-Z]/.test(value)
  const hasLowerCase = /[a-z]/.test(value)
  const hasNumber = /[0-9]/.test(value)
  
  if (!hasMinLength) return 'Senha deve ter no mínimo 8 caracteres'
  if (!hasUpperCase) return 'Senha deve conter letra maiúscula'
  if (!hasLowerCase) return 'Senha deve conter letra minúscula'
  if (!hasNumber) return 'Senha deve conter número'
  
  return true
}

/**
 * Valida se dois campos são iguais
 */
export const sameAs = (otherValue, fieldName = 'campo') => (value) => {
  return value === otherValue || `Deve ser igual ao ${fieldName}`
}

/**
 * Valida arquivo
 */
export const fileSize = (maxSizeMB) => (file) => {
  if (!file) return true
  const maxSize = maxSizeMB * 1024 * 1024
  return file.size <= maxSize || `Arquivo deve ter no máximo ${maxSizeMB}MB`
}

/**
 * Valida tipo de arquivo
 */
export const fileType = (allowedTypes) => (file) => {
  if (!file) return true
  const types = Array.isArray(allowedTypes) ? allowedTypes : [allowedTypes]
  return types.includes(file.type) || `Tipo de arquivo não permitido`
}
