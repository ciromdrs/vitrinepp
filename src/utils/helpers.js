/**
 * Utilitários gerais para o projeto
 */

/**
 * Debounce function - atrasa execução até que pare de ser chamada
 * @param {Function} func - Função para executar
 * @param {number} wait - Tempo de espera em ms
 */
export function debounce(func, wait = 300) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function - limita execução a uma vez por intervalo
 * @param {Function} func - Função para executar
 * @param {number} limit - Intervalo mínimo em ms
 */
export function throttle(func, limit = 300) {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Formata moeda brasileira
 * @param {number} value - Valor numérico
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

/**
 * Formata data para padrão brasileiro
 * @param {string|Date} date - Data para formatar
 */
export function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return new Intl.DateFormat('pt-BR').format(d)
}

/**
 * Formata data e hora
 * @param {string|Date} date - Data para formatar
 */
export function formatDateTime(date) {
  if (!date) return ''
  const d = new Date(date)
  return new Intl.DateFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(d)
}

/**
 * Trunca texto com reticências
 * @param {string} text - Texto para truncar
 * @param {number} length - Tamanho máximo
 */
export function truncate(text, length = 100) {
  if (!text) return ''
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

/**
 * Remove acentos de string
 * @param {string} str - String para normalizar
 */
export function removeAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

/**
 * Gera slug a partir de string
 * @param {string} str - String para converter
 */
export function slugify(str) {
  return removeAccents(str)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Copia texto para clipboard
 * @param {string} text - Texto para copiar
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    // Fallback para navegadores antigos
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const success = document.execCommand('copy')
    document.body.removeChild(textarea)
    return success
  }
}

/**
 * Valida CPF
 * @param {string} cpf - CPF para validar
 */
export function validateCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, '')
  
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false
  }

  let sum = 0
  let remainder

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(9, 10))) return false

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(10, 11))) return false

  return true
}

/**
 * Formata CPF
 * @param {string} cpf - CPF para formatar
 */
export function formatCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, '')
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

/**
 * Formata telefone
 * @param {string} phone - Telefone para formatar
 */
export function formatPhone(phone) {
  phone = phone.replace(/[^\d]/g, '')
  if (phone.length === 11) {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  } else if (phone.length === 10) {
    return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
  return phone
}

/**
 * Scroll suave até elemento
 * @param {string|Element} target - Seletor ou elemento
 * @param {number} offset - Offset em pixels
 */
export function scrollToElement(target, offset = 0) {
  const element = typeof target === 'string' 
    ? document.querySelector(target) 
    : target

  if (!element) return

  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - offset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })
}

/**
 * Verifica se está em modo mobile
 */
export function isMobile() {
  return window.innerWidth <= 768
}

/**
 * Verifica se está em modo tablet
 */
export function isTablet() {
  return window.innerWidth > 768 && window.innerWidth <= 1024
}

/**
 * Verifica se está em modo desktop
 */
export function isDesktop() {
  return window.innerWidth > 1024
}

/**
 * Gera ID único
 */
export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Deep clone de objeto
 * @param {any} obj - Objeto para clonar
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Verifica se objeto está vazio
 * @param {object} obj - Objeto para verificar
 */
export function isEmpty(obj) {
  return Object.keys(obj).length === 0
}

/**
 * Aguarda tempo especificado (delay)
 * @param {number} ms - Milissegundos para aguardar
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Retry function - tenta executar função várias vezes
 * @param {Function} fn - Função async para executar
 * @param {number} retries - Número de tentativas
 * @param {number} delay - Delay entre tentativas (ms)
 */
export async function retry(fn, retries = 3, delay = 1000) {
  try {
    return await fn()
  } catch (error) {
    if (retries <= 0) {
      throw error
    }
    await sleep(delay)
    return retry(fn, retries - 1, delay)
  }
}

/**
 * Formata tamanho de arquivo
 * @param {number} bytes - Tamanho em bytes
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Sanitiza HTML para prevenir XSS
 * @param {string} html - HTML para sanitizar
 */
export function sanitizeHTML(html) {
  const div = document.createElement('div')
  div.textContent = html
  return div.innerHTML
}
