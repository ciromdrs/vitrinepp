# 🚀 Instruções de Instalação e Uso

## 📋 Pré-requisitos

- Node.js 16+ instalado
- NPM ou Yarn
- Backend API rodando

## ⚙️ Instalação

1. **Clone o repositório** (se ainda não tiver):
```bash
cd vitrinepp-vite
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Configure as variáveis de ambiente**:
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env com a URL da sua API
# VITE_API_URL=http://localhost:8000/api
```

4. **Inicie o servidor de desenvolvimento**:
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 🏗️ Build para Produção

```bash
npm run build
```

Os arquivos de produção estarão na pasta `dist/`.

## 📁 Estrutura do Projeto Atualizada

```
vitrinepp-vite/
├── public/                    # Arquivos públicos estáticos
│   ├── images/
│   └── Degular/
├── src/
│   ├── components/
│   │   ├── common/           # ✨ NOVO: Componentes reutilizáveis
│   │   │   ├── NotificationContainer.vue
│   │   │   ├── LoadingSpinner.vue
│   │   │   └── ErrorDisplay.vue
│   │   ├── pages/            # Páginas da aplicação
│   │   │   ├── Home.vue
│   │   │   ├── Loja.vue
│   │   │   ├── RoupaPagina.vue
│   │   │   └── adm/          # Páginas administrativas
│   │   └── [outros...]       # Outros componentes
│   │
│   ├── composables/          # ✨ NOVO: Lógica reutilizável
│   │   ├── useApi.js
│   │   ├── useAuth.js
│   │   ├── useNotification.js
│   │   ├── useRoupas.js
│   │   └── useMarcas.js
│   │
│   ├── services/             # ✨ NOVO: Camada de API
│   │   ├── apiService.js
│   │   ├── authService.js
│   │   ├── roupasService.js
│   │   └── marcasService.js
│   │
│   ├── config/               # ✨ NOVO: Configurações
│   │   ├── constants.js
│   │   └── env.js
│   │
│   ├── utils/                # ✨ NOVO: Utilitários
│   │   ├── formatters.js
│   │   └── validators.js
│   │
│   ├── router/
│   │   └── index.js          # ✨ ATUALIZADO: Com guards
│   │
│   ├── data/                 # Dados mockados (se houver)
│   ├── styles/               # Estilos globais
│   ├── App.vue               # ✨ ATUALIZADO: Com NotificationContainer
│   └── main.js
│
├── .env.example              # ✨ NOVO: Exemplo de variáveis
├── .gitignore
├── jsconfig.json             # ✨ NOVO: Configuração do JS
├── vite.config.js            # ✨ ATUALIZADO: Com alias @
├── package.json
├── MELHORAS.md              # ✨ NOVO: Documentação completa
├── MIGRACAO.md              # ✨ NOVO: Guia de migração
└── README_RESUMO.md         # ✨ NOVO: Resumo executivo
```

## 🔧 Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Cria build de produção
npm run preview      # Preview do build de produção

# Linting (se configurado)
npm run lint         # Executa linter
```

## 🎯 Como Usar os Novos Recursos

### 1. Usando Composables em um Componente

```vue
<script>
import { onMounted } from 'vue'
import { useRoupas } from '@/composables/useRoupas'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorDisplay from '@/components/common/ErrorDisplay.vue'

export default {
  components: { LoadingSpinner, ErrorDisplay },
  
  setup() {
    // Obtém as funções e estados do composable
    const { 
      roupas,           // Array de roupas
      isLoading,        // Estado de carregamento
      error,            // Erro (se houver)
      carregarRoupas    // Função para carregar
    } = useRoupas()
    
    // Carrega ao montar o componente
    onMounted(async () => {
      await carregarRoupas()
    })
    
    // Retorna para usar no template
    return { 
      roupas, 
      isLoading, 
      error, 
      carregarRoupas 
    }
  }
}
</script>

<template>
  <div>
    <!-- Mostra loading enquanto carrega -->
    <LoadingSpinner :isLoading="isLoading" message="Carregando roupas..." />
    
    <!-- Mostra erro se houver -->
    <ErrorDisplay 
      v-if="error && !isLoading" 
      :error="error"
      :showRetry="true"
      @retry="carregarRoupas"
    />
    
    <!-- Mostra conteúdo -->
    <div v-if="!isLoading && !error">
      <div v-for="roupa in roupas" :key="roupa.id">
        {{ roupa.nome }}
      </div>
    </div>
  </div>
</template>
```

### 2. Usando Notificações

```vue
<script>
import { useNotification } from '@/composables/useNotification'

export default {
  setup() {
    const { success, error, warning, info } = useNotification()
    
    const salvar = async () => {
      try {
        // ... lógica de salvamento
        success('Salvo com sucesso!')
      } catch (e) {
        error('Erro ao salvar: ' + e.message)
      }
    }
    
    return { salvar }
  }
}
</script>
```

### 3. Usando Serviços Diretamente (raro)

```javascript
import { roupasService } from '@/services/roupasService'

// Em um composable ou função
const { data, error } = await roupasService.getById(1)
if (error) {
  console.error(error)
} else {
  console.log(data)
}
```

### 4. Criando uma Rota Protegida

```javascript
// Em router/index.js
{
  path: '/minha-rota-admin',
  component: MinhaPage,
  meta: { 
    requiresAuth: true,  // ✨ Adicione esta linha
    title: 'Minha Página Admin'
  }
}
```

### 5. Usando Validadores

```vue
<script>
import { ref, computed } from 'vue'
import { required, email, minLength } from '@/utils/validators'

export default {
  setup() {
    const formData = ref({
      nome: '',
      email: '',
      senha: ''
    })
    
    const errors = computed(() => ({
      nome: required(formData.value.nome),
      email: email(formData.value.email),
      senha: minLength(8)(formData.value.senha)
    }))
    
    const isValid = computed(() => {
      return Object.values(errors.value).every(e => e === true)
    })
    
    return { formData, errors, isValid }
  }
}
</script>

<template>
  <form>
    <input v-model="formData.nome" />
    <span v-if="errors.nome !== true">{{ errors.nome }}</span>
    
    <input v-model="formData.email" />
    <span v-if="errors.email !== true">{{ errors.email }}</span>
    
    <button :disabled="!isValid">Enviar</button>
  </form>
</template>
```

### 6. Usando Formatadores

```vue
<script>
import { formatCurrency, formatDate } from '@/utils/formatters'

export default {
  setup() {
    return { formatCurrency, formatDate }
  }
}
</script>

<template>
  <div>
    <p>Preço: {{ formatCurrency(roupa.preco) }}</p>
    <p>Data: {{ formatDate(roupa.created_at) }}</p>
  </div>
</template>
```

## 🐛 Troubleshooting

### Erro: "Module not found: @/..."
**Solução**: Reinicie o servidor de desenvolvimento após adicionar o alias.

```bash
# Pare o servidor (Ctrl+C)
npm run dev
```

### Notificações não aparecem
**Solução**: Verifique se `NotificationContainer` está no `App.vue`:

```vue
<template>
  <Header></Header>
  <router-view />
  <NotificationContainer />  <!-- ✅ Deve estar aqui -->
</template>
```

### Erro 401 em todas as requisições
**Solução**: 
1. Verifique se o backend está rodando
2. Configure a URL correta no `.env`
3. Faça login novamente

### Rotas protegidas não funcionam
**Solução**: O guard do router foi configurado para verificar autenticação automaticamente. Certifique-se de que o backend está retornando tokens corretamente.

## 📚 Documentação Adicional

- **MELHORAS.md** - Documentação completa das melhorias e arquitetura
- **MIGRACAO.md** - Guia detalhado para migrar componentes antigos
- **README_RESUMO.md** - Resumo executivo das mudanças

## 🤝 Contribuindo

Ao adicionar novos recursos:

1. **Componentes UI** → `src/components/`
2. **Lógica reutilizável** → `src/composables/`
3. **Chamadas de API** → `src/services/`
4. **Utilitários** → `src/utils/`
5. **Configurações** → `src/config/`

Sempre siga os padrões estabelecidos nos arquivos existentes!

## 📞 Suporte

Para dúvidas sobre:
- **Estrutura do projeto** → Consulte `MELHORAS.md`
- **Migração de componentes** → Consulte `MIGRACAO.md`
- **Uso rápido** → Consulte `README_RESUMO.md`
- **Vue 3** → [Documentação oficial do Vue](https://vuejs.org)

---

**Bom desenvolvimento! 🎉**
