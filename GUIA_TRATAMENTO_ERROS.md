# 🎨 Guia de Tratamento de Erros Visual

## ✅ Páginas com Tratamento Completo

Todas as principais páginas agora possuem tratamento de erros visual:

### 1. **Home** ([src/components/pages/Home.vue](src/components/pages/Home.vue))
- ✅ LoadingSpinner enquanto carrega
- ✅ ErrorDisplay se falhar
- ✅ Botão "Tentar novamente"

### 2. **Loja** ([src/components/pages/Loja.vue](src/components/pages/Loja.vue))
- ✅ LoadingSpinner inline
- ✅ ErrorDisplay com retry
- ✅ Integrado com filtros

### 3. **Marcas** ([src/components/pages/MarcasPage.vue](src/components/pages/MarcasPage.vue))
- ✅ LoadingSpinner
- ✅ ErrorDisplay
- ✅ Carrega marcas populares + todas

### 4. **Detalhes da Marca** ([src/components/pages/MarcaDetailsPage.vue](src/components/pages/MarcaDetailsPage.vue))
- ✅ LoadingSpinner
- ✅ ErrorDisplay
- ✅ Watch para mudanças de rota
- ⚠️ Destaques falham graciosamente (não quebra a página)

### 5. **Detalhes da Roupa** ([src/components/pages/RoupaPagina.vue](src/components/pages/RoupaPagina.vue))
- ✅ LoadingSpinner com mensagem
- ✅ ErrorDisplay
- ✅ Watch para mudanças de rota
- ✅ Usa composable `useRoupas`

## 📦 Componentes Disponíveis

### LoadingSpinner
```vue
<LoadingSpinner 
  :isLoading="isLoading" 
  :overlay="false"  <!-- false = inline, true = fullscreen -->
  message="Carregando dados..." 
  variant="default"  <!-- 'default', 'dots', 'pulse' -->
/>
```

### ErrorDisplay
```vue
<ErrorDisplay 
  v-if="error && !isLoading" 
  :error="error"
  title="Erro ao carregar"
  type="error"  <!-- 'error', 'warning', 'info' -->
  :showRetry="true"
  :dismissible="true"
  @retry="carregarDados"
  @dismiss="error = null"
/>
```

## 🎯 Padrão de Implementação

### Para páginas com dados assíncronos:

```vue
<script>
import LoadingSpinner from '../common/LoadingSpinner.vue'
import ErrorDisplay from '../common/ErrorDisplay.vue'
import axios from 'axios'

export default {
  components: {
    LoadingSpinner,
    ErrorDisplay
  },
  data() {
    return {
      dados: null,
      isLoading: true,
      error: null
    }
  },
  created() {
    this.carregarDados()
  },
  methods: {
    async carregarDados() {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await axios.get(this.baseURL + 'endpoint/')
        this.dados = response.data
      } catch (error) {
        console.error(error)
        this.error = error.response?.data?.message || 'Erro ao carregar dados'
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<template>
  <main>
    <!-- Loading -->
    <LoadingSpinner :isLoading="isLoading" :overlay="false" message="Carregando..." />
    
    <!-- Error -->
    <ErrorDisplay 
      v-if="error && !isLoading" 
      :error="error"
      :showRetry="true"
      @retry="carregarDados"
    />
    
    <!-- Content -->
    <div v-if="!isLoading && !error && dados">
      <!-- Seu conteúdo aqui -->
    </div>
  </main>
</template>
```

## 🔧 Usando Composables

### Com useApi (genérico):
```vue
<script setup>
import { useApi } from '@/composables/useApi'
import { api } from '@/services/apiService'

const { isLoading, error, execute } = useApi()
const dados = ref(null)

const carregarDados = async () => {
  const { data } = await execute(
    () => api.get('/endpoint'),
    {
      showError: true,
      onSuccess: (responseData) => {
        dados.value = responseData
      }
    }
  )
}
</script>
```

### Com useRoupas (específico):
```vue
<script setup>
import { useRoupas } from '@/composables/useRoupas'

const { roupas, isLoading, error, carregarRoupas } = useRoupas()

onMounted(() => {
  carregarRoupas({ ordering: '-id' })
})
</script>
```

### Com useMarcas (específico):
```vue
<script setup>
import { useMarcas } from '@/composables/useMarcas'

const { marcas, isLoading, error, carregarMarcas } = useMarcas()

onMounted(() => {
  carregarMarcas()
})
</script>
```

## 🎨 Variantes de Loading

### Default (spinner rotativo)
```vue
<LoadingSpinner variant="default" />
```

### Dots (pontos animados)
```vue
<LoadingSpinner variant="dots" />
```

### Pulse (pulso)
```vue
<LoadingSpinner variant="pulse" />
```

## 🚨 Tipos de Erro

### Error (vermelho)
```vue
<ErrorDisplay type="error" :error="erro" />
```

### Warning (amarelo)
```vue
<ErrorDisplay type="warning" :error="aviso" />
```

### Info (azul)
```vue
<ErrorDisplay type="info" :error="info" />
```

## 💡 Boas Práticas

### ✅ Faça:
- Use `try/catch/finally` para controle de fluxo
- Sempre resete `error` antes de nova tentativa
- Use mensagens de erro amigáveis para o usuário
- Adicione botão "Tentar novamente" em erros recuperáveis
- Use `isLoading` para desabilitar ações durante carregamento

### ❌ Evite:
- Deixar erros apenas no console
- Mensagens técnicas para usuários
- Loading sem feedback visual
- Bloquear a UI inteira com overlay quando desnecessário
- Esquecer de limpar estados entre tentativas

## 📱 Responsividade

Todos os componentes são totalmente responsivos:
- LoadingSpinner se adapta ao container
- ErrorDisplay ajusta layout em mobile
- Modais ocupam tela cheia em dispositivos pequenos

## 🎯 Próximos Passos

Para páginas admin, considere adicionar o mesmo padrão:
- admRoupa.vue
- admMarca.vue
- admEditarRoupa.vue
- admEditarMarca.vue
- etc.

O padrão é o mesmo, apenas importe os componentes e adicione os estados!
