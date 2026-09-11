# 🛍️ VitriNEPP - Vitrine Digital

Uma plataforma moderna de vitrine digital para gerenciamento e exibição de produtos de moda, desenvolvida com Vue 3 + Vite.

## ✨ Destaques

- 🎨 Interface moderna e responsiva
- 🔐 Sistema de autenticação robusto
- 📱 Design mobile-first
- 🚀 Performance otimizada com Vite
- 🎯 Arquitetura escalável e mantível
- 🔔 Sistema de notificações em tempo real
- 💪 Tratamento de erros robusto
- 🧩 Componentes reutilizáveis

## 🚀 Tecnologias

- **Vue 3** - Framework JavaScript progressivo
- **Vite** - Build tool e dev server ultrarrápido
- **Vue Router** - Roteamento oficial para Vue
- **Axios** - Cliente HTTP
- **Bootstrap Icons Vue** - Ícones
- **Vue Image Zoomer** - Zoom de imagens

## 📦 Instalação Rápida

```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre na pasta do projeto
cd vitrinepp-vite

# Instale as dependências
npm install

# Configure o arquivo .env
cp .env.example .env
# Edite o .env com a URL da sua API

# Inicie o servidor de desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

## 🎯 Comandos Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Cria build de produção
npm run preview  # Preview do build de produção
```

## 📚 Documentação Completa

Este projeto possui documentação extensa para facilitar o desenvolvimento:

- **[📖 INDICE.md](./INDICE.md)** - Índice de toda documentação
- **[🚀 INSTALACAO.md](./INSTALACAO.md)** - Guia completo de instalação
- **[📝 README_RESUMO.md](./README_RESUMO.md)** - Resumo das melhorias
- **[📚 MELHORAS.md](./MELHORAS.md)** - Documentação técnica detalhada
- **[🔄 MIGRACAO.md](./MIGRACAO.md)** - Guia de migração de componentes
- **[📘 BOAS_PRATICAS.md](./BOAS_PRATICAS.md)** - Guia de boas práticas

**👉 Comece pelo [INDICE.md](./INDICE.md) para navegar pela documentação!**

## 🏗️ Arquitetura do Projeto

```
src/
├── components/          # Componentes Vue
│   ├── common/         # ✨ Componentes reutilizáveis
│   ├── pages/          # Páginas da aplicação
│   └── ...
├── composables/        # ✨ Lógica reutilizável (Composition API)
├── services/           # ✨ Camada de API
├── config/             # ✨ Configurações e constantes
├── utils/              # ✨ Utilitários e helpers
├── router/             # Configuração de rotas
└── styles/             # Estilos globais
```

**✨ = Novos recursos implementados**

## 🎯 Principais Features

### Para Usuários
- 🛍️ Navegação intuitiva de produtos
- 🔍 Busca e filtros avançados
- 📱 Visualização de detalhes de produtos
- 🔗 Compartilhamento de produtos
- 📧 Contato direto com marcas

### Para Administradores
- 🔐 Sistema de autenticação
- ➕ CRUD completo de produtos
- 🏷️ Gerenciamento de marcas
- 👥 Gestão de usuários admin
- 📊 Painel administrativo

## 🔥 Melhorias Recentes

O projeto passou por uma grande refatoração implementando:

✅ **Arquitetura de Serviços** - API centralizada e reutilizável  
✅ **Composables Vue 3** - Lógica compartilhada eficiente  
✅ **Sistema de Notificações** - Feedback visual elegante  
✅ **Tratamento de Erros** - Robusto e user-friendly  
✅ **Loading States** - Indicadores visuais claros  
✅ **Router Guards** - Proteção de rotas administrativas  
✅ **Configuração Centralizada** - Fácil manutenção  

Veja detalhes completos em [README_RESUMO.md](./README_RESUMO.md)

## 🤝 Contribuindo

Ao contribuir com o projeto, por favor:

1. Leia [BOAS_PRATICAS.md](./BOAS_PRATICAS.md)
2. Siga os padrões estabelecidos
3. Documente código complexo
4. Teste antes de commitar
5. Use mensagens de commit descritivas

## 📝 Estrutura de Dados

### Roupa
```javascript
{
  id: Number,
  nome: String,
  descricao: String,
  preco: Number,
  img: String,
  extraImgs: Array,
  marca_nome: String,
  marca_email: String,
  tamanhos: Array
}
```

### Marca
```javascript
{
  id: Number,
  nome: String,
  descricao: String,
  logo: String,
  email: String,
  website: String
}
```

## 🔧 Configuração

### Variáveis de Ambiente (.env)

```bash
# URL da API backend
VITE_API_URL=http://localhost:8000/api
```

### Desenvolvimento Local

1. Configure o backend/API
2. Configure o arquivo `.env`
3. Execute `npm run dev`
4. Acesse `http://localhost:3000`

## 📱 Páginas

### Públicas
- `/` - Home
- `/loja` - Catálogo de produtos
- `/loja/:id` - Detalhes do produto
- `/marcas` - Lista de marcas
- `/marcas/:id` - Detalhes da marca
- `/sobre-nos` - Sobre o projeto

### Administrativas (Protegidas)
- `/adm` - Login administrativo
- `/admRoupa` - Gerenciar roupas
- `/admMarca` - Gerenciar marcas
- `/admEditar/:id` - Editar roupa
- `/admEditarMarca/:id` - Editar marca
- `/editarStaff/:id` - Editar administrador
- `/create-adm` - Criar administrador

## 🎨 Estilização

O projeto utiliza:
- CSS customizado
- Variáveis CSS para temas
- Design responsivo
- Mobile-first approach

## 🐛 Troubleshooting

Problemas comuns e soluções estão documentados em:
- [INSTALACAO.md](./INSTALACAO.md#troubleshooting)
- [MIGRACAO.md](./MIGRACAO.md#troubleshooting)

## 📄 Licença

[Sua licença aqui]

## 👥 Time

Desenvolvido por [Seu time/organização]

## 📞 Suporte

Para dúvidas e suporte:
- Consulte a [documentação completa](./INDICE.md)
- Abra uma issue no repositório
- Entre em contato com a equipe

---

**Feito com ❤️ usando Vue 3 + Vite**

