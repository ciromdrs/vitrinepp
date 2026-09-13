import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/pages/Home.vue'
import RoupaPagina from '../components/pages/RoupaPagina.vue'
import Loja from '../components/pages/Loja.vue'
import MarcasPage from '../components/pages/MarcasPage.vue'
import MarcaDetailsPage from '../components/pages/MarcaDetailsPage.vue'
import SobreNos from '../components/pages/SobreNos.vue'
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

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = `${to.meta.title} - VitriNEPP`
    }
    next()
})

export default router