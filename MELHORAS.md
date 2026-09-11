# VitriNEPP - Melhorias e Estrutura do Projeto

## 🎯 Melhorias Implementadas

### 1. **Arquitetura de Serviços (Service Layer)**
Criada uma camada de serviços para centralizar todas as chamadas à API:

- **`apiService.js`**: Configuração base do Axios com interceptors
- **`roupasService.js`**: Todas as operações relacionadas a roupas
- **`marcasService.js`**: Todas as operações relacionadas a marcas
- **`authService.js`**: Autenticação e gerenciamento de usuários

### 2. **Composables Vue 3**
Composables reutilizáveis para lógica de negócio:

- **`useApi.js`**: Gerencia loading e estados de erro
- **`useAuth.js`**: Gerencia autenticação
- **`useNotification.js`**: Sistema de notificações
- **`useRoupas.js`**: Operações CRUD de roupas
- **`useMarcas.js`**: Operações CRUD de marcas

### 3. **Sistema de Notificações**
Componente de notificação visual para feedback ao usuário:
- Notificações de sucesso, erro, aviso e informação
- Animações suaves
- Auto-dismiss configurável
- Responsivo

### 4. **Tratamento de Erros**
- Tratamento centralizado de erros na camada de API
- Mensagens amigáveis ao usuário
- Componente `ErrorDisplay` para exibir erros
- Retry automático em falhas de autenticação

### 5. **Loading States**
- Componente `LoadingSpinner` para estados de carregamento
- Overlay configurável
- Mensagens personalizadas

### 6. **Router Guards**
- Proteção de rotas administrativas
- Redirecionamento automático para login
- Títulos de página dinâmicos

### 7. **Configuração Centralizada**
- Constantes em `constants.js`
- Configuração de ambiente em `.env`
- URLs e endpoints centralizados

## 📁 Nova Estrutura de Arquivos

```
src/
├── components/
│   ├── common/                    # Componentes reutilizáveis
│   │   ├── NotificationContainer.vue
│   │   ├── LoadingSpinner.vue
│   │   └── ErrorDisplay.vue
│   ├── pages/                     # Páginas da aplicação
│   │   ├── Home.vue
│   │   ├── Loja.vue
│   │   ├── RoupaPagina.vue
│   │   ├── MarcasPage.vue
│   │   └── adm/                   # Páginas administrativas
│   └── [outros componentes]
├── composables/                   # Lógica reutilizável (Composition API)
│   ├── useApi.js
│   ├── useAuth.js
│   ├── useNotification.js
│   ├── useRoupas.js
│   └── useMarcas.js
├── services/                      # Camada de serviços/API
│   ├── apiService.js
│   ├── authService.js
│   ├── roupasService.js
│   └── marcasService.js
├── config/                        # Configurações e constantes
│   ├── constants.js
│   └── env.js
├── router/
│   └── index.js                   # Router com guards
├── App.vue
└── main.js
```

## 🚀 Como Usar

### Configuração Inicial

1. **Configure o arquivo .env**:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com a URL da sua API:
```
VITE_API_URL=http://localhost:8000/api
```

### Usando os Serviços

#### Exemplo: Componente com Roupas
```vue
<script>
import { useRoupas } from '@/composables/useRoupas'
import { onMounted } from 'vue'

export default {
  setup() {
    const { roupas, isLoading, error, carregarRoupas } = useRoupas()
    
    onMounted(async () => {
      await carregarRoupas()
    })
    
    return { roupas, isLoading, error }
  }
}
</script>
```

#### Exemplo: Notificações
```vue
<script>
import { useNotification } from '@/composables/useNotification'

export default {
  setup() {
    const { success, error, warning, info } = useNotification()
    
    const salvar = async () => {
      // ... lógica de salvamento
      success('Salvo com sucesso!')
    }
    
    return { salvar }
  }
}
</script>
```

#### Exemplo: Autenticação
```vue
<script>
import { useAuth } from '@/composables/useAuth'

export default {
  setup() {
    const { login, isLoading, error } = useAuth()
    
    const handleLogin = async () => {
      const result = await login(username, password)
      if (result.success) {
        router.push('/admRoupa')
      }
    }
    
    return { handleLogin, isLoading, error }
  }
}
</script>
```

## 🎨 Componentes Comuns

### NotificationContainer
Adicione no `App.vue` (já adicionado):
```vue
<template>
  <NotificationContainer />
</template>
```

### LoadingSpinner
```vue
<template>
  <LoadingSpinner :isLoading="isLoading" message="Carregando..." />
</template>
```

### ErrorDisplay
```vue
<template>
  <ErrorDisplay 
    :error="error"
    :showRetry="true"
    @retry="carregarDados"
  />
</template>
```

## 🔐 Rotas Protegidas

As rotas administrativas agora requerem autenticação. Adicione `requiresAuth: true` na meta:

```javascript
{
  path: '/admRoupa',
  component: AdmRoupa,
  meta: { requiresAuth: true, title: 'Gerenciar Roupas' }
}
```

## 📊 Tratamento de Erros

Todos os erros são tratados automaticamente:
- Erros de rede
- Erros de autenticação (401) - refresh automático
- Erros de validação (400)
- Erros do servidor (500)

Você pode personalizar o tratamento:
```javascript
const { data, error } = await execute(
  () => roupasService.create(dados),
  {
    showError: true, // Mostra notificação de erro
    onSuccess: (data) => {
      // Callback de sucesso
    },
    onError: (error) => {
      // Tratamento customizado de erro
    }
  }
)
```

## 🔄 Próximos Passos Recomendados

1. **Testes Unitários**: Adicionar testes com Vitest
2. **Validação de Formulários**: Implementar biblioteca de validação (Vuelidate/VeeValidate)
3. **Paginação**: Adicionar componente de paginação reutilizável
4. **Cache**: Implementar cache de requisições (React Query ou similar)
5. **Internacionalização**: Adicionar i18n se necessário
6. **Otimização de Imagens**: Lazy loading e otimização
7. **PWA**: Transformar em Progressive Web App
8. **CI/CD**: Configurar pipeline de deploy

## 📝 Boas Práticas Implementadas

✅ Separação de concerns (UI, lógica, dados)  
✅ Código reutilizável com composables  
✅ Tratamento consistente de erros  
✅ Feedback visual ao usuário  
✅ Configuração centralizada  
✅ Rotas protegidas com guards  
✅ Loading states  
✅ Código documentado  
✅ Estrutura escalável  

## 🐛 Debug

Para debugar, os composables expõem estados úteis:
```javascript
const { isLoading, error } = useRoupas()

console.log('Loading:', isLoading.value)
console.log('Error:', error.value)
```

## 📞 Suporte

Para dúvidas sobre a nova estrutura, consulte:
- Documentação do Vue 3 Composition API
- Documentação do Vue Router
- Documentação do Axios
