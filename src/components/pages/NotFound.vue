<template>
  <div class="not-found">
    <div class="not-found__content">
      <h1 class="not-found__title">404</h1>
      <h2 class="not-found__subtitle">Página não encontrada</h2>
      <p class="not-found__description">
        A página que você está procurando não existe ou foi movida.
      </p>
      <div class="not-found__actions">
        <button @click="goHome" class="btn btn--primary">
          Voltar para o início
        </button>
        <button @click="goBack" class="btn btn--secondary">
          Voltar
        </button>
      </div>
    </div>
    <div class="not-found__illustration">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="80" fill="var(--figure-bg)" />
        <text x="100" y="120" text-anchor="middle" font-size="60" fill="var(--rosewood)">404</text>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  gap: 3em;
  padding: 2em;
}

.not-found__content {
  max-width: 600px;
}

.not-found__title {
  font-size: 6em;
  font-weight: bold;
  color: var(--rosewood);
  margin-bottom: 0.2em;
  line-height: 1;
}

.not-found__subtitle {
  font-size: 2em;
  margin-bottom: 0.5em;
  color: var(--text);
}

.not-found__description {
  font-size: 1.2em;
  color: var(--subtext);
  margin-bottom: 2em;
  line-height: 1.5;
}

.not-found__actions {
  display: flex;
  gap: 1em;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.8em 2em;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.btn--primary {
  background-color: var(--rosewood);
  color: white;
}

.btn--primary:hover {
  background-color: var(--rosewood-light);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(103, 5, 8, 0.3);
}

.btn--secondary {
  background-color: transparent;
  color: var(--text);
  border: 2px solid var(--text);
}

.btn--secondary:hover {
  background-color: var(--text);
  color: var(--off-main);
  transform: translateY(-2px);
}

.not-found__illustration svg {
  max-width: 300px;
  height: auto;
}

@media (max-width: 768px) {
  .not-found__title {
    font-size: 4em;
  }

  .not-found__subtitle {
    font-size: 1.5em;
  }

  .not-found__description {
    font-size: 1em;
  }

  .not-found__actions {
    flex-direction: column;
    width: 100%;
  }

  .btn {
    width: 100%;
  }
}
</style>
