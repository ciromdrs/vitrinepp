import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import VueImageZoomer from 'vue-image-zoomer';
import 'vue-image-zoomer/dist/style.css';

const app = createApp(App)

// Error handler global
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err)
  console.error('Error info:', info)
  console.error('Component:', instance)
  
  // Aqui você pode integrar com serviços de logging como Sentry
  // Sentry.captureException(err)
}

// Warning handler (útil para desenvolvimento)
app.config.warnHandler = (msg, instance, trace) => {
  console.warn('Vue warning:', msg)
  console.warn('Trace:', trace)
}

app.use(router)
app.use(VueImageZoomer)

// Variável global do link p/ puxar do backend
app.config.globalProperties.baseURL = 'https://testeapi-jabb.onrender.com/'

// Handler de erros não capturados
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  event.preventDefault()
})

// Handler de erros JavaScript gerais
window.addEventListener('error', (event) => {
  console.error('Global error event:', event.error)
})

app.mount('#app')