<script>
import Descricao from '../../Descricao.vue';
import Input from '../../Input.vue';
import MarcaDetails from '../../MarcaDetails.vue'
import axios from 'axios';
import getRefreshToken from '../../../data/functions';
import { authService } from '@/services/authService';

export default {
    async mounted() {
        const isAuthenticated = await authService.checkAuth();
        console.log(isAuthenticated)
        if(!isAuthenticated) {
            console.log('nao ta autenticado')
            this.$router.replace('/adm')    
        }
    },
    created() {
        // checar se tá logado
        getRefreshToken(this.baseURL)
        setInterval(() => {
            getRefreshToken(this.baseURL) // Executar a cada 5 minutos, tempo que o refresh expira
        }, 300000)
        
        // Puxar id da marca
        this.marcaId = Number(this.$route.params.id)
        console.log(this.marcaId)

        // Puxar dados atuais da marca
        const endpoint = this.baseURL + `marcas/${this.marcaId}/`
        axios.get(endpoint).then(response => {
            console.log(response.data)
            const marcaAtual = response.data
            this.marcaNome = marcaAtual.nome; // nome p/ 'Atualizando marca X'
            this.marca.nome = marcaAtual.nome;
            this.marca.descricao = marcaAtual.descricao;
            this.marca.email = marcaAtual.email;
            this.marca.telefone = marcaAtual.telefone;
            this.marca.foto_perfil = marcaAtual.foto_perfil;
            this.marca.banner = marcaAtual.banner;
        }).catch(error => {
            console.error(error)
        })

    },
    components: {
        Input,
        MarcaDetails,
        Descricao
    },
    data() {
        return {
            marcaId: null,
            marcaNome: null, // nome p/ 'Atualizando marca X'
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
            const endpoint = this.baseURL + `marcas/${this.marcaId}/`
            const formData = new FormData();

            formData.append('nome', this.marca.nome)
            formData.append('descricao', this.marca.descricao)
            if(this.marca.foto_perfil.arquivo) formData.append('foto_perfil', this.marca.foto_perfil.arquivo)
            if(this.marca.banner.arquivo) formData.append('banner', this.marca.banner.arquivo)
            formData.append('email', this.marca.email)
            formData.append('telefone', this.marca.telefone)
            
            for(let [key, value] of formData.entries()) {
                console.log(key, value)
            }

            axios.put(endpoint, formData, {
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                },
                withCredentials: true
            }).then((response) => {
                console.log(response.data)
                alert('Marca atualizada!')
            }).catch((error) => {
                console.log('Erro: ' + JSON.stringify(error.response.data))
            })
        }
    },
    computed: {
        // preview da marca
        marcaPreview() {
            return {
                nome: this.marca.nome,
                descricao: this.marca.descricao,
                foto_perfil: this.marca.foto_perfil?.url || this.marca.foto_perfil,
                banner: this.marca.banner?.url || this.marca.banner,
                email: this.marca.email,
                telefone: this.marca.telefone
            }
        }
    },
}
</script>
<template>
    <main>
        <router-link to='/adm'>Voltar</router-link>
        <form action="" @submit.prevent="enviarMarca">
            <h1>Atualizar marca {{ this.marca.nome }}</h1>
            <Input campo="nome" v-model="marca.nome"></Input>
            <Input campo="descricao" descrição v-model="marca.descricao"></Input>
            <Input campo="email" v-model="marca.email"></Input>
            <Input campo="telefone" telefone v-model="marca.telefone"></Input>
            <Input campo="foto_perfil" imagem pagEditar v-model="marca.foto_perfil"></Input>
            <Input campo="banner" imagem pagEditar v-model="marca.banner"></Input>
            <button type="submit">Atualizar marca</button>
    
            <MarcaDetails :marca="marcaPreview"></MarcaDetails>
            <Descricao :descricao="marca.descricao"></Descricao>
        </form>
    </main>
</template>
<style scoped>
    a {
        color: var(--rosewood-light);
        font-size: 1.25em;
        width: fit-content;
        &:hover {color: var(--rosewood);}
    }

    .dark main a {
        color: var(--off-white);
        &:hover { color: var(--rosewood-light); }
    }

    main {
        gap: 1em;
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

    button[type='submit'] {
        background-color: var(--rosewood);
        color: var(--off-white);
        padding: .5em;
        border-radius: .5em;
        transition: 200ms ease;
        cursor: pointer;
        border: 1px solid black;
        &:hover {
            background-color: var(--rosewood-light);
        }
    }
</style>