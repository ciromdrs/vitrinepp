<script>
import Input from '../../Input.vue';
import axios from 'axios';
import getRefreshToken from '../../../data/functions';
import { authService } from '@/services/authService';

export default {
    async mounted(){
        const isAuthenticated = await authService.checkAuth();
        console.log(isAuthenticated)
        if(!isAuthenticated) {
            console.log('nao ta autenticado')
            this.$router.replace('/adm')    
        }
    },
    created() {
        // Atualizar refresh token
        getRefreshToken(this.baseURL)
        setInterval(() => {
            getRefreshToken(this.baseURL) // Executar a cada 5 minutos, tempo que o refresh expira
        }, 300000)

        // Verificar se é superADM
        let endpoint = this.baseURL + 'usuarios/me/'
        axios.get(endpoint, { withCredentials: true }).then(response => {
            console.log(response.data)
            if (response.data.tipo != 'admin') {
                window.location.href = window.location.origin + '/adm'
            } else {
                console.log('ta aprovado rapaiz')
            }
        }).catch(error => {
            console.log(error)
            window.location.href = window.location.origin + '/adm'
        })
    },
    components: {
        Input
    },
    data(){
        return {
            isLoading: false,
            username: '',
            password: ''
        }
    },
    methods: {
        criarAdm(e) {
            e.preventDefault();
            let endpoint = this.baseURL + 'usuarios/create/'

            axios.post(endpoint, {
                username: this.username,
                password: this.password
            }, { withCredentials: true }).then(response => {
                console.log(response.data)
                window.alert('Usuário criado com sucesso!');
                window.location.href = window.location.origin + '/adm'
            }).catch(error => {
                console.log(error)
            })
        }
    },
}
</script>
<template>
    <main>
        <h1>Criar novo administrador</h1>
        <form @submit="criarAdm">
            <Input campo="username" v-model="username"></Input>
            <Input campo="password" senha v-model="password"></Input>
            <button type="submit" :class="{ disabled: isLoading }">Enviar</button>
        </form>
    </main>
</template>
<style scoped>
    main{
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: .5em;
        justify-content: center;
        align-items: center;
        margin: 0 .5em;
        h1 {
            margin-bottom: .5em;
        }
    }
    
    form {
        display: flex;
        flex-direction: column;
        gap: .5em;
        button {
            margin-top: 1em;
            height: 2em;
            background-color: var(--rosewood);
            color: white;
            border: 1px solid black;
            border-radius: 8px;
            cursor: pointer;
            &:hover {
                background-color: var(--rosewood-light);
            }
        }

        button.disabled {
            cursor: wait;
        }
    }
</style>