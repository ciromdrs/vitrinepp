# Guia de Migração - Componentes para Nova Estrutura

## 🔄 Como Migrar Componentes Existentes

### 1. Mudança de Options API para Composition API

#### ❌ Antes (Options API):
```vue
<script>
import axios from 'axios'

export default {
  data() {
    return {
      items: [],
      loading: false
    }
  },
  methods: {
    async fetchItems() {
      this.loading = true
      try {
        const response = await axios.get(this.baseURL + 'items/')
        this.items = response.data
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    }
  },
  created() {
    this.fetchItems()
  }
}
</script>
```

#### ✅ Depois (Composition API + Services):
```vue
<script>
import { onMounted } from 'vue'
import { useItems } from '@/composables/useItems'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorDisplay from '@/components/common/ErrorDisplay.vue'

export default {
  components: { LoadingSpinner, ErrorDisplay },
  setup() {
    const { items, isLoading, error, carregarItems } = useItems()
    
    onMounted(() => {
      carregarItems()
    })
    
    return { items, isLoading, error, carregarItems }
  }
}
</script>

<template>
  <div>
    <LoadingSpinner :isLoading="isLoading" />
    <ErrorDisplay :error="error" @retry="carregarItems" />
    <!-- Seu conteúdo -->
  </div>
</template>
```

### 2. Substituir Axios Direto por Serviços

#### ❌ Antes:
```javascript
// No componente
import axios from 'axios'

axios.get(this.baseURL + 'roupas/produtos/' + id).then(response => {
  this.roupa = response.data
}).catch(error => {
  console.log(error)
})
```

#### ✅ Depois:
```javascript
// Use o composable
import { useRoupas } from '@/composables/useRoupas'

const { carregarRoupa } = useRoupas()
await carregarRoupa(id)
```

### 3. Substituir Alerts por Notificações

#### ❌ Antes:
```javascript
async copyURL() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    alert('URL copiado')
  } catch (e) {
    alert('Erro ao copiar URL: ' + e.message)
  }
}
```

#### ✅ Depois:
```javascript
import { useNotification } from '@/composables/useNotification'

setup() {
  const { success, error } = useNotification()
  
  const copyURL = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      success('URL copiado com sucesso!')
    } catch (e) {
      error('Erro ao copiar URL: ' + e.message)
    }
  }
  
  return { copyURL }
}
```

### 4. Gerenciar Estado de Loading

#### ❌ Antes:
```javascript
data() {
  return {
    loading: false
  }
},
methods: {
  async fetchData() {
    this.loading = true
    try {
      // fetch data
    } finally {
      this.loading = false
    }
  }
}
```

#### ✅ Depois:
```javascript
// O composable já gerencia loading automaticamente
const { isLoading, carregarDados } = useRoupas()
```

### 5. Tratamento de Erros

#### ❌ Antes:
```javascript
axios.get(url).then(response => {
  // sucesso
}).catch(error => {
  console.log(error.response.data) // Usuário não vê o erro
})
```

#### ✅ Depois:
```vue
<script>
const { error, carregarDados } = useRoupas()
// Erros são automaticamente notificados e disponíveis no estado
</script>

<template>
  <ErrorDisplay :error="error" @retry="carregarDados" />
</template>
```

## 📋 Checklist de Migração

Para cada componente que você migrar:

- [ ] Remover imports de `axios`
- [ ] Substituir `this.baseURL` por uso de serviços
- [ ] Converter `data()` para `ref()` ou `reactive()`
- [ ] Converter `methods` para funções dentro de `setup()`
- [ ] Converter `computed` para `computed()` do Vue
- [ ] Substituir lifecycle hooks:
  - `created()` → `onMounted()`
  - `mounted()` → `onMounted()`
  - `beforeDestroy()` → `onBeforeUnmount()`
  - `destroyed()` → `onUnmounted()`
- [ ] Remover `this.` de todas as referências
- [ ] Adicionar componentes de Loading e Error
- [ ] Substituir `alert()` por notificações
- [ ] Retornar valores necessários no `setup()`

## 🎯 Exemplos por Tipo de Componente

### Componente de Listagem

```vue
<script>
import { onMounted } from 'vue'
import { useRoupas } from '@/composables/useRoupas'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorDisplay from '@/components/common/ErrorDisplay.vue'

export default {
  components: { LoadingSpinner, ErrorDisplay },
  setup() {
    const { roupas, isLoading, error, carregarRoupas } = useRoupas()
    
    onMounted(() => {
      carregarRoupas()
    })
    
    return { roupas, isLoading, error, carregarRoupas }
  }
}
</script>

<template>
  <div>
    <LoadingSpinner :isLoading="isLoading" />
    <ErrorDisplay :error="error" @retry="carregarRoupas" />
    <div v-for="roupa in roupas" :key="roupa.id">
      <!-- Item -->
    </div>
  </div>
</template>
```

### Componente de Formulário

```vue
<script>
import { ref } from 'vue'
import { useRoupas } from '@/composables/useRoupas'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const { criarRoupa, isLoading } = useRoupas()
    
    const formData = ref({
      nome: '',
      preco: '',
      descricao: ''
    })
    
    const handleSubmit = async () => {
      const resultado = await criarRoupa(formData.value)
      if (resultado) {
        router.push('/loja')
      }
    }
    
    return { formData, handleSubmit, isLoading }
  }
}
</script>
```

### Componente Admin (com Auth)

```vue
<script>
import { onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const { checkAuth, isLoading } = useAuth()
    
    onMounted(async () => {
      const isAuth = await checkAuth()
      if (!isAuth) {
        router.push('/adm')
      }
    })
    
    return { isLoading }
  }
}
</script>
```

## 🔧 Troubleshooting

### Erro: "Cannot read property of undefined"
- **Causa**: Tentando acessar `this.algo`
- **Solução**: Remova `this.` - use as variáveis diretamente

### Erro: "Module not found: @/..."
- **Causa**: Alias `@` não configurado
- **Solução**: Já configurado no `vite.config.js` e `jsconfig.json`

### Notificações não aparecem
- **Causa**: `NotificationContainer` não adicionado no `App.vue`
- **Solução**: Já adicionado no `App.vue`

### Estado não atualiza
- **Causa**: Esqueceu de usar `ref()` ou não está retornando no `setup()`
- **Solução**: Envolva valores reativos em `ref()` e retorne no `setup()`

## 📚 Recursos

- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue Router Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)
- [Axios Interceptors](https://axios-http.com/docs/interceptors)
