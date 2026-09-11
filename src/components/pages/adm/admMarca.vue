.<script>
import Descricao from '../../Descricao.vue';
import Input from '../../Input.vue';
import MarcaDetails from '../../MarcaDetails.vue'
import axios from 'axios';
import getRefreshToken from '../../../data/functions'
import { authService } from '@/services/authService';
import router from '@/router';

export default {
    async mounted() {
        // checar se tá logado
        const isAuthenticated = await authService.checkAuth();
        console.log(isAuthenticated)
        if(!isAuthenticated) {
            console.log('nao ta autenticado')
            this.$router.replace('/adm')    
        }

        if (this.baseURL) {
            getRefreshToken(this.baseURL)
            setInterval(() => {
                getRefreshToken(this.baseURL) // Executar a cada 5 minutos, tempo que o refresh expira
            }, 300000)
        }
    },
    components: {
        Input,
        MarcaDetails,
        Descricao
    },
    data() {
        return {
            marca: {
                nome: '',
                descricao: '',
                foto_perfil: '',
                banner: '',
                email: '',
                telefone: ''
            }
        }
    },
    methods: {
        enviarMarca() {
            console.log("Enviando");
            const endpoint = this.baseURL + 'marcas/'
            const formData = new FormData();

            formData.append('nome', this.marca.nome)
            formData.append('descricao', this.marca.descricao)
            formData.append('foto_perfil', this.marca.foto_perfil.arquivo)
            formData.append('banner', this.marca.banner.arquivo)
            formData.append('email', this.marca.email)
            formData.append('telefone', this.marca.telefone)

                console.log('criando')

            for(let [key, value] of formData.entries()) {
                console.log(key, value)
            }
            axios.post(endpoint, formData, {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
                withCredentials: true
            }).then(() => {
                alert('Marca criada!')

                // resetar os inputs qnd der certo
                this.marca = {
                    nome: '',
                    descricao: '',
                    foto_perfil: '',
                    banner: '',
                    email: '',
                    telefone: ''
                }
            }).catch((error) => {
                console.log('Erro: ' + error.response.data)
            })
        }
    },
    computed: {
        // preview da marca
        marcaPreview() {
            return {
                nome: this.marca.nome,
                descricao: this.marca.descricao,
                foto_perfil: this.marca.foto_perfil?.url || '',
                banner: this.marca.banner?.url || '',
                email: this.marca.email,
                telefone: this.marca.telefone
            }
        }
    },
}
</script>
<template>
    <div class="admin-marca-page">
        <router-link to='/adm' class="back-link">← Voltar</router-link>
        <form action="" @submit.prevent="enviarMarca">
            <h1>Criar nova marca</h1>
            <Input campo="nome" v-model="marca.nome"></Input>
            <Input campo="descricao" descrição v-model="marca.descricao"></Input>
            <Input campo="email" v-model="marca.email"></Input>
            <Input campo="telefone" telefone v-model="marca.telefone"></Input>
            <Input campo="foto_perfil" imagem v-model="marca.foto_perfil"></Input>
            <Input campo="banner" imagem v-model="marca.banner"></Input>
            <button type="submit">Enviar nova marca</button>
    
            <div class="preview-section">
                <h2>Preview</h2>
                <MarcaDetails v-if="marca.nome" :marca="marcaPreview"></MarcaDetails>
                <Descricao v-if="marca.descricao" :descricao="marca.descricao"></Descricao>
            </div>
        </form>
    </div>
</template>
<style scoped>
    .admin-marca-page {
        padding: 2em;
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    .back-link {
        color: var(--rosewood-light);
        font-size: 1.25em;
        width: fit-content;
        text-decoration: none;
        &:hover {
            color: var(--rosewood);
        }
    }

    .dark .back-link {
        color: var(--off-white);
        &:hover { 
            color: var(--rosewood-light); 
        }
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    h1 {
        text-transform: uppercase;
        line-height: 1;
    }

    .preview-section {
        margin-top: 2em;
        padding-top: 2em;
        border-top: 2px solid var(--rosewood);
    }

    .preview-section h2 {
        margin-bottom: 1em;
        color: var(--rosewood);
    }

    button[type='submit'] {
        background-color: var(--rosewood);
        color: var(--off-white);
        padding: .75em 1.5em;
        border-radius: .5em;
        transition: 200ms ease;
        cursor: pointer;
        border: 1px solid black;
        font-size: 1em;
        font-weight: 600;
        &:hover {
            background-color: var(--rosewood-light);
            transform: translateY(-2px);
        }
        &:active {
            transform: translateY(0);
        }
    }
</style>