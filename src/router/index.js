import { createRouter, createWebHistory } from 'vue-router'
import { authService } from '@/services/authService'
import Home from '../components/pages/Home.vue'
import RoupaPagina from '../components/pages/RoupaPagina.vue'
import Loja from '../components/pages/Loja.vue'
import AdmRoupa from '../components/pages/adm/AdmRoupa.vue'
import MarcasPage from '../components/pages/MarcasPage.vue'
import MarcaDetailsPage from '../components/pages/MarcaDetailsPage.vue'
import SobreNos from '../components/pages/SobreNos.vue'
import AdmMarca from '../components/pages/adm/admMarca.vue'
import AdmLogin from '../components/pages/adm/admLogin.vue'
import AdmEditarRoupa from '../components/pages/adm/admEditarRoupa.vue'
import AdmEditarMarca from '../components/pages/adm/admEditarMarca.vue'
import EditarAdmin from '../components/pages/adm/editarAdmin.vue'
import CriarAdmin from '../components/pages/adm/criarAdmin.vue'
import NotFound from '../components/pages/NotFound.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: { title: 'Home' }
        },
        {
            path: '/loja',
            name: 'Loja',
            component: Loja,
            meta: { title: 'Loja' }
        },
        {
            path: '/loja/:id',
            name: 'RoupaDetalhes',
            component: RoupaPagina,
            meta: { title: 'Detalhes da Roupa' }
        },
        {
            path: '/marcas',
            name: 'Marcas',
            component: MarcasPage,
            meta: { title: 'Marcas' }
        },
        {
            path: '/marcas/:id',
            name: 'MarcaDetalhes',
            component: MarcaDetailsPage,
            meta: { title: 'Detalhes da Marca' }
        },
        {
            path: '/sobre-nos',
            name: 'SobreNos',
            component: SobreNos,
            meta: { title: 'Sobre Nós' }
        },
        {
            path: '/adm',
            name: 'AdminLogin',
            component: AdmLogin,
            meta: { title: 'Login Admin' }
        },
        {
            path: '/admRoupa',
            name: 'AdminRoupa',
            component: AdmRoupa,
            meta: { requiresAuth: true, title: 'Gerenciar Roupas' }
        },
        {
            path: '/admMarca',
            name: 'AdminMarca',
            component: AdmMarca,
            meta: { requiresAuth: true, title: 'Gerenciar Marcas' }
        },
        {
            path: '/admEditar/:id',
            name: 'AdminEditarRoupa',
            component: AdmEditarRoupa,
            meta: { requiresAuth: true, title: 'Editar Roupa' }
        },
        {
            path: '/admEditarMarca/:id',
            name: 'AdminEditarMarca',
            component: AdmEditarMarca,
            meta: { requiresAuth: true, title: 'Editar Marca' }
        },
        {
            path: '/editarStaff/:id',
            name: 'EditarAdmin',
            component: EditarAdmin,
            meta: { requiresAuth: true, title: 'Editar Admin' }
        },
        {
            path: '/create-adm',
            name: 'CriarAdmin',
            component: CriarAdmin,
            meta: { requiresAuth: true, title: 'Criar Admin' }
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound,
            meta: { title: 'Página não encontrada' }
        }
    ],
    scrollBehavior () {
        return { top: 0, behavior: 'smooth' }
    }
})

// Navigation guard para rotas protegidas
router.beforeEach(async (to, from, next) => {
    // Atualiza o título da página
    if (to.meta.title) {
        document.title = `${to.meta.title} - VitriNEPP`
    }

    // Verifica se a rota requer autenticação
    if (to.meta.requiresAuth) {
        const isAuthenticated = await authService.checkAuth()
        
        if (!isAuthenticated) {
            // Redireciona para login se não estiver autenticado
            // Evita adicionar redirect se já está indo para o login
            if (to.name !== 'AdminLogin') {
                next({
                    name: 'AdminLogin',
                    query: { redirect: to.fullPath }
                })
            } else {
                next()
            }
        } else {
            next()
        }
    } else {
        // Rota não requer autenticação
        // Se está autenticado e acessa /adm, verifica se há redirect pendente
        if (to.name === 'AdminLogin') {
            const redirect = to.query.redirect
            if (redirect) {
                const isAuthenticated = await authService.checkAuth()
                if (isAuthenticated) {
                    next(redirect)
                    return
                }
            }
        }
        next()
    }
})

export default router