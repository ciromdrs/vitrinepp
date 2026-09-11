# 📖 Boas Práticas de Desenvolvimento - VitriNEPP

## 🎯 Princípios Gerais

### 1. **Separação de Concerns**
Mantenha responsabilidades separadas:

```
❌ NÃO FAÇA:
- Lógica de API no componente
- Estado global no componente
- Lógica de negócio no serviço

✅ FAÇA:
- Componentes apenas para UI
- Composables para lógica
- Serviços para API
- Config para configurações
```

### 2. **DRY (Don't Repeat Yourself)**
```javascript
// ❌ Não repetir código
// Em cada componente:
axios.get(url).then(...).catch(...)

// ✅ Criar um composable/serviço
const { carregarDados } = useApi()
```

### 3. **SOLID Principles**

**Single Responsibility**: Cada função/componente faz uma coisa
```javascript
// ❌ Função que faz muitas coisas
function processarEValidarESalvar(data) { ... }

// ✅ Separar responsabilidades
function validar(data) { ... }
function processar(data) { ... }
function salvar(data) { ... }
```

## 🧩 Estrutura de Componentes

### Template
```vue
<template>
  <!-- 1. Loading state -->
  <LoadingSpinner :isLoading="isLoading" />
  
  <!-- 2. Error state -->
  <ErrorDisplay :error="error" @retry="carregar" />
  
  <!-- 3. Empty state (opcional) -->
  <div v-if="items.length === 0 && !isLoading">
    Nenhum item encontrado
  </div>
  
  <!-- 4. Conteúdo principal -->
  <div v-else>
    <!-- Seu conteúdo aqui -->
  </div>
</template>
```

### Script (Composition API)
```vue
<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'MeuComponente', // ✅ Sempre nomeie
  
  components: {
    // Componentes importados
  },
  
  props: {
    // Props com validação
    id: {
      type: Number,
      required: true
    }
  },
  
  emits: ['update', 'delete'], // ✅ Declare os emits
  
  setup(props, { emit }) {
    // 1. Refs e reactive
    const dados = ref([])
    
    // 2. Computed
    const dadosFiltrados = computed(() => {
      return dados.value.filter(...)
    })
    
    // 3. Methods
    const carregar = async () => {
      // ...
    }
    
    // 4. Lifecycle
    onMounted(() => {
      carregar()
    })
    
    // 5. Return
    return {
      dados,
      dadosFiltrados,
      carregar
    }
  }
}
</script>
```

## 🎨 Estilos

### Sempre use `scoped`
```vue
<style scoped>
/* Estilos aplicados apenas a este componente */
.minha-classe {
  color: red;
}
</style>
```

### Organização de estilos
```css
/* 1. Layout */
.container {
  display: flex;
  gap: 1rem;
}

/* 2. Elementos */
.titulo {
  font-size: 2rem;
}

/* 3. Estados */
.ativo {
  color: blue;
}

/* 4. Responsividade */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
```

## 🔄 Composables

### Estrutura padrão
```javascript
// useAlgo.js
import { ref } from 'vue'

export function useAlgo() {
  // 1. Estado
  const estado = ref(null)
  const isLoading = ref(false)
  const error = ref(null)
  
  // 2. Funções
  const carregar = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      // lógica
      estado.value = resultado
    } catch (e) {
      error.value = e
    } finally {
      isLoading.value = false
    }
  }
  
  // 3. Return
  return {
    estado,
    isLoading,
    error,
    carregar
  }
}
```

### Nomenclatura
```javascript
// ✅ BOM
useAuth()      // Autenticação
useRoupas()    // CRUD de roupas
useApi()       // API genérica

// ❌ RUIM
authComposable()
roupasHelper()
apiUtils()
```

## 📡 Serviços (Services)

### Estrutura padrão
```javascript
// algoService.js
import { api } from './apiService'
import { API_ENDPOINTS } from '@/config/constants'

export const algoService = {
  /**
   * Descrição da função
   * @param {type} param - Descrição
   * @returns {Promise<{data, error}>}
   */
  async getAll(params = {}) {
    return await api.get(API_ENDPOINTS.ALGO, { params })
  },
  
  async getById(id) {
    return await api.get(API_ENDPOINTS.ALGO_DETAIL(id))
  },
  
  async create(data) {
    return await api.post(API_ENDPOINTS.ALGO_CREATE, data)
  },
  
  async update(id, data) {
    return await api.put(API_ENDPOINTS.ALGO_UPDATE(id), data)
  },
  
  async delete(id) {
    return await api.delete(API_ENDPOINTS.ALGO_DELETE(id))
  }
}
```

### Sempre retornar { data, error }
```javascript
// ✅ BOM
return { data: response.data, error: null }
return { data: null, error: handleApiError(error) }

// ❌ RUIM
return response.data
throw error
```

## 🔔 Notificações

### Quando usar
```javascript
// ✅ Usar notificações para:
success('Salvo com sucesso!')        // Operações bem-sucedidas
error('Erro ao salvar')              // Erros do usuário
warning('Dados podem estar desatualizados') // Avisos
info('Carregando dados do servidor') // Informações

// ❌ NÃO usar alert():
alert('Algo aconteceu') // NUNCA!
```

### Mensagens claras
```javascript
// ✅ BOM
success('Roupa criada com sucesso!')
error('Erro ao deletar marca. Tente novamente.')

// ❌ RUIM
success('OK')
error('Erro')
```

## 🐛 Tratamento de Erros

### Sempre tratar erros
```javascript
// ✅ BOM
const { data, error } = await carregarDados()
if (error) {
  // Tratar erro
  return
}
// Usar data

// ❌ RUIM
const data = await carregarDados()
// E se der erro?
```

### Mostrar erros ao usuário
```vue
<template>
  <ErrorDisplay :error="error" @retry="carregar" />
</template>
```

### Logs úteis
```javascript
// ✅ BOM
console.error('Erro ao carregar roupas:', error)
console.log('Roupas carregadas:', roupas.length)

// ❌ RUIM
console.log('aqui')
console.log(error)
```

## 📝 Nomenclatura

### Componentes
```
✅ PascalCase
- RoupaDetalhes.vue
- NotificationContainer.vue
- LoadingSpinner.vue

❌ Errado
- roupa-detalhes.vue
- notificationcontainer.vue
- loading_spinner.vue
```

### Variáveis e Funções
```javascript
// ✅ camelCase
const minhasRoupas = []
const carregarDados = () => {}

// ❌ Errado
const MinhasRoupas = []
const carregar_dados = () => {}
```

### Constantes
```javascript
// ✅ UPPER_SNAKE_CASE
const API_BASE_URL = '...'
const MAX_ITEMS = 100

// ❌ Errado
const apiBaseUrl = '...'
const maxItems = 100
```

### Booleanos
```javascript
// ✅ Prefixo is/has/can
const isLoading = ref(false)
const hasPermission = ref(true)
const canEdit = computed(() => ...)

// ❌ Errado
const loading = ref(false)
const permission = ref(true)
```

## 🎯 Props e Emits

### Props com validação completa
```javascript
props: {
  roupa: {
    type: Object,
    required: true,
    validator: (value) => {
      return value.id && value.nome
    }
  },
  mostrarDetalhes: {
    type: Boolean,
    default: false
  }
}
```

### Emits declarados
```javascript
export default {
  emits: {
    'update': (value) => {
      // Validação opcional
      return typeof value === 'object'
    },
    'delete': null
  },
  
  setup(props, { emit }) {
    const atualizar = () => {
      emit('update', novoValor)
    }
  }
}
```

## 🔄 Reatividade

### Use ref para valores primitivos
```javascript
// ✅ BOM
const count = ref(0)
const nome = ref('')

// ❌ RUIM
let count = 0 // Não é reativo!
```

### Use reactive para objetos
```javascript
// ✅ BOM
const user = reactive({
  nome: '',
  email: ''
})

// Também OK
const user = ref({
  nome: '',
  email: ''
})
```

### Não desestruture reactive
```javascript
const state = reactive({ count: 0 })

// ❌ Perde reatividade
const { count } = state

// ✅ Use toRefs
const { count } = toRefs(state)
```

## 📚 Imports Organizados

```javascript
// 1. Vue
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// 2. Composables internos
import { useRoupas } from '@/composables/useRoupas'
import { useNotification } from '@/composables/useNotification'

// 3. Componentes
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorDisplay from '@/components/common/ErrorDisplay.vue'

// 4. Utils
import { formatCurrency } from '@/utils/formatters'

// 5. External libraries
import axios from 'axios'
```

## ✅ Checklist Antes de Commit

- [ ] Código funciona sem erros
- [ ] Sem console.logs desnecessários
- [ ] Componentes nomeados corretamente
- [ ] Props e emits validados
- [ ] Tratamento de erros implementado
- [ ] Loading states adicionados
- [ ] Notificações ao usuário
- [ ] Código comentado (se complexo)
- [ ] Sem código comentado/não usado
- [ ] Imports organizados
- [ ] Estilos com scoped

## 🚫 O Que Evitar

```javascript
// ❌ Não use var
var x = 10

// ❌ Não use this no setup()
setup() {
  this.algo // Erro!
}

// ❌ Não misture Options e Composition API
export default {
  data() { ... },      // Options API
  setup() { ... }      // Composition API
}

// ❌ Não manipule DOM diretamente
document.getElementById('...')

// ❌ Não use axios diretamente
axios.get(...)

// ❌ Não use alert/confirm
alert('Algo')
```

## ✅ O Que Fazer

```javascript
// ✅ Use const/let
const x = 10
let y = 20

// ✅ Use refs no setup()
setup() {
  const algo = ref(null)
}

// ✅ Use Composition API puro
export default {
  setup() { ... }
}

// ✅ Use refs do Vue
const element = ref(null)

// ✅ Use serviços
import { roupasService } from '@/services/roupasService'

// ✅ Use notificações
const { success } = useNotification()
success('Operação concluída!')
```

## 📖 Documentação

### Documente funções complexas
```javascript
/**
 * Calcula o preço total com desconto
 * @param {number} preco - Preço original
 * @param {number} desconto - Percentual de desconto (0-100)
 * @returns {number} Preço final com desconto
 */
function calcularPrecoComDesconto(preco, desconto) {
  return preco * (1 - desconto / 100)
}
```

### Comente código complexo
```javascript
// Verifica se o usuário tem permissão especial
// baseado no role e na data de criação da conta
if (user.role === 'admin' || user.createdAt < specialDate) {
  // ...
}
```

## 🎓 Recursos para Aprender

- [Vue 3 Documentation](https://vuejs.org)
- [Vue Router](https://router.vuejs.org)
- [Composition API FAQ](https://vuejs.org/guide/extras/composition-api-faq.html)
- [JavaScript Clean Code](https://github.com/ryanmcdermott/clean-code-javascript)

---

**Seguindo essas práticas, seu código será mais limpo, mantível e profissional! 🚀**
