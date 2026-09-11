# 🛠️ Guia de Componentes e Composables

## 📦 Componentes Comuns

### ErrorDisplay

Componente para exibir erros de forma amigável.

```vue
<ErrorDisplay
  :error="errorObject"
  title="Ops! Algo deu errado"
  type="error"
  :show-retry="true"
  :dismissible="true"
  @retry="handleRetry"
  @dismiss="clearError"
/>
```

**Props:**
- `error` (String|Object|Error) - Erro a ser exibido
- `title` (String) - Título do erro
- `type` (String) - Tipo: 'error', 'warning', 'info'
- `showRetry` (Boolean) - Mostrar botão de retry
- `dismissible` (Boolean) - Pode ser fechado

### LoadingSpinner

Componente de loading com múltiplas variantes.

```vue
<LoadingSpinner
  :is-loading="isLoading"
  message="Carregando dados..."
  :overlay="true"
  variant="default"
/>
```

**Props:**
- `isLoading` (Boolean) - Controla visibilidade
- `message` (String) - Mensagem opcional
- `overlay` (Boolean) - Modo fullscreen ou inline
- `variant` (String) - Estilo: 'default', 'dots', 'pulse'

### ConfirmModal

Modal de confirmação para ações importantes.

```vue
<ConfirmModal
  v-model="showModal"
  title="Confirmar exclusão"
  message="Tem certeza?"
  confirm-text="Sim, deletar"
  cancel-text="Cancelar"
  variant="danger"
  :loading="isDeleting"
  @confirm="handleConfirm"
  @cancel="handleCancel"
/>
```

**Props:**
- `v-model` (Boolean) - Controla visibilidade
- `title` (String) - Título do modal
- `message` (String) - Mensagem
- `confirmText` (String) - Texto do botão confirmar
- `cancelText` (String) - Texto do botão cancelar
- `variant` (String) - Estilo: 'primary', 'danger', 'warning'
- `loading` (Boolean) - Estado de loading

## 🎣 Composables

### useApi

Gerencia chamadas de API com loading e error states.

```javascript
import { useApi } from '@/composables/useApi'
import { api } from '@/services/apiService'

const { isLoading, error, execute, clearError } = useApi()

const fetchData = async () => {
  const { data, error } = await execute(
    () => api.get('/endpoint'),
    {
      showError: true,
      onSuccess: (data) => console.log('Sucesso!', data),
      onError: (err) => console.error('Erro!', err)
    }
  )
}
```

**Retorno:**
- `isLoading` (Ref<Boolean>) - Estado de loading
- `error` (Ref<Error>) - Erro atual
- `execute` (Function) - Executa chamada
- `clearError` (Function) - Limpa erro

### useGlobalLoading

Gerencia loading global da aplicação.

```javascript
import { useGlobalLoading } from '@/composables/useGlobalLoading'

const { 
  isLoading, 
  loadingMessage, 
  startLoading, 
  stopLoading,
  withLoading 
} = useGlobalLoading()

// Uso simples
startLoading('Processando...')
await doSomething()
stopLoading()

// Com wrapper
await withLoading(
  async () => await fetchData(),
  'Carregando...'
)
```

**Retorno:**
- `isLoading` (Ref<Boolean>) - Estado global de loading
- `loadingMessage` (Ref<String>) - Mensagem atual
- `startLoading(message)` - Inicia loading
- `stopLoading()` - Para loading
- `forceStopLoading()` - Força parar tudo
- `withLoading(fn, message)` - Wrapper async

### useFormValidation

Validação de formulários com regras customizáveis.

```javascript
import { useFormValidation } from '@/composables/useFormValidation'

const { 
  values, 
  errors, 
  touched,
  isValid,
  isDirty,
  validators,
  handleChange,
  handleBlur,
  handleSubmit,
  resetForm
} = useFormValidation(
  // Valores iniciais
  {
    email: '',
    password: '',
    age: 0
  },
  // Regras de validação
  {
    email: [validators.required, validators.email],
    password: [
      validators.required, 
      validators.minLength(8)
    ],
    age: [validators.required, validators.min(18)]
  }
)

// No template
<input
  :value="values.email"
  @input="e => handleChange('email', e.target.value)"
  @blur="() => handleBlur('email')"
/>
<span v-if="errors.email">{{ errors.email }}</span>

// Submit
const onSubmit = async () => {
  await handleSubmit(async (formValues) => {
    await api.post('/endpoint', formValues)
  })
}
```

**Validadores Disponíveis:**
- `validators.required` - Campo obrigatório
- `validators.email` - Email válido
- `validators.minLength(n)` - Mínimo de caracteres
- `validators.maxLength(n)` - Máximo de caracteres
- `validators.min(n)` - Valor mínimo numérico
- `validators.max(n)` - Valor máximo numérico
- `validators.url` - URL válida
- `validators.pattern(regex, msg)` - Padrão customizado

## 🔧 Utilitários (helpers.js)

### Formatação

```javascript
import { 
  formatCurrency, 
  formatDate, 
  formatCPF,
  formatPhone 
} from '@/utils/helpers'

formatCurrency(1234.56) // "R$ 1.234,56"
formatDate('2024-01-15') // "15/01/2024"
formatCPF('12345678900') // "123.456.789-00"
formatPhone('11987654321') // "(11) 98765-4321"
```

### Performance

```javascript
import { debounce, throttle } from '@/utils/helpers'

// Debounce para input de busca
const handleSearch = debounce((query) => {
  search(query)
}, 500)

// Throttle para scroll
const handleScroll = throttle(() => {
  checkScrollPosition()
}, 200)
```

### Manipulação de Strings

```javascript
import { truncate, slugify, removeAccents } from '@/utils/helpers'

truncate('Texto muito longo...', 20) // "Texto muito longo..."
slugify('Título do Post') // "titulo-do-post"
removeAccents('José María') // "Jose Maria"
```

### Validação

```javascript
import { validateCPF } from '@/utils/helpers'

validateCPF('123.456.789-00') // true ou false
```

### Utilidades Gerais

```javascript
import { 
  copyToClipboard,
  scrollToElement,
  isMobile,
  generateId,
  sleep,
  retry
} from '@/utils/helpers'

// Copiar texto
await copyToClipboard('Texto para copiar')

// Scroll suave
scrollToElement('#section', 80) // offset de 80px

// Detecção de dispositivo
if (isMobile()) {
  // código mobile
}

// Gerar ID único
const id = generateId() // "1706234567890-x7k3m9p2q"

// Aguardar
await sleep(2000) // 2 segundos

// Retry automático
await retry(
  async () => await fetchData(),
  3, // tentativas
  1000 // delay entre tentativas
)
```

## 🎨 Classes CSS Utilitárias

### Espaçamento

```html
<div class="mt-2 mb-3 p-4">
  <!-- margin-top: 1rem, margin-bottom: 1.5rem, padding: 2rem -->
</div>
```

### Layout Flexbox

```html
<div class="flex flex-center gap-2">
  <!-- display: flex, center alignment, gap: 1rem -->
</div>
```

### Texto

```html
<p class="text-center text-bold text-primary">
  Texto centralizado, negrito, cor primária
</p>
```

### Responsividade

```html
<div class="hide-mobile">Visível apenas no desktop</div>
<div class="hide-desktop">Visível apenas no mobile</div>
```

### Animações

```html
<div class="fade-in">Elemento com fade in</div>
<div class="slide-up">Elemento que sobe</div>
```

### Container

```html
<div class="container">
  <!-- max-width: 1200px, centralizado -->
</div>
```

### Card

```html
<div class="card">
  <!-- background, border-radius, padding, shadow -->
</div>
```

## 🌐 API Service

### Uso Básico

```javascript
import { api } from '@/services/apiService'

// GET
const { data, error } = await api.get('/roupas')

// POST
const { data, error } = await api.post('/roupas', {
  nome: 'Camisa',
  preco: 59.90
})

// PUT
const { data, error } = await api.put('/roupas/1', updatedData)

// PATCH
const { data, error } = await api.patch('/roupas/1', partialData)

// DELETE
const { data, error } = await api.delete('/roupas/1')
```

### Com Configuração

```javascript
// Headers customizados
const { data, error } = await api.get('/endpoint', {
  headers: {
    'Custom-Header': 'value'
  }
})

// Query params
const { data, error } = await api.get('/roupas', {
  params: {
    categoria: 'camisas',
    ordem: 'preco'
  }
})
```

### Tratamento de Erros

```javascript
const { data, error } = await api.get('/endpoint')

if (error) {
  console.error('Status:', error.status)
  console.error('Mensagem:', error.message)
  console.error('Dados:', error.data)
}
```

## 🎯 Boas Práticas

### 1. Sempre use composables para lógica reutilizável

```javascript
// ❌ Evite
export default {
  data() {
    return { isLoading: false, error: null }
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      try {
        // fetch...
      } catch (e) {
        this.error = e
      } finally {
        this.isLoading = false
      }
    }
  }
}

// ✅ Prefira
const { isLoading, error, execute } = useApi()
const fetchData = () => execute(() => api.get('/data'))
```

### 2. Use ErrorDisplay para feedback de erros

```vue
<!-- ❌ Evite -->
<div v-if="error" style="color: red;">{{ error }}</div>

<!-- ✅ Prefira -->
<ErrorDisplay :error="error" :show-retry="true" @retry="retry" />
```

### 3. Valide formulários com useFormValidation

```javascript
// ❌ Evite validação manual
if (!email) errors.push('Email obrigatório')
if (!email.includes('@')) errors.push('Email inválido')

// ✅ Use o composable
const { validators } = useFormValidation(values, {
  email: [validators.required, validators.email]
})
```

### 4. Use utilitários de helpers.js

```javascript
// ❌ Evite código duplicado
const formatted = `R$ ${value.toFixed(2).replace('.', ',')}`

// ✅ Use helper
const formatted = formatCurrency(value)
```

### 5. Adicione loading states

```vue
<!-- ✅ Sempre forneça feedback visual -->
<LoadingSpinner :is-loading="isLoading" />
<button :disabled="isLoading">
  {{ isLoading ? 'Salvando...' : 'Salvar' }}
</button>
```

## 📚 Recursos Adicionais

- [Vue 3 Documentation](https://vuejs.org/)
- [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue Router](https://router.vuejs.org/)
- [Axios](https://axios-http.com/)

## 🤝 Contribuindo

Ao adicionar novos componentes ou composables:

1. Documente props, events e slots
2. Adicione exemplos de uso
3. Garanta responsividade
4. Considere acessibilidade
5. Teste em diferentes navegadores
6. Atualize este guia

---

**Última atualização:** Janeiro 2025
