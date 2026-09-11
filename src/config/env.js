// Arquivo de configuração para variáveis de ambiente
// Crie um arquivo .env na raiz do projeto com:
// VITE_API_URL=http://seu-backend-url/api

export default {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
}
