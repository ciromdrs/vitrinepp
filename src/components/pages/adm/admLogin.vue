<script>
import Input from '../../Input.vue';
import axios from 'axios'
import AdmSelecionarRoupa from '../../admSelecionarRoupa.vue';
import AdmSelecionarMarca from '../../admSelecionarMarca.vue';
import Administrador from '../../Administrador.vue';
import getRefreshToken from '../../../data/functions';

export default {
    created() {
        // checar se tá logado
        this.checkLoginStatus()
        setInterval(() => {
            getRefreshToken(this.baseURL) // Executar a cada 5 minutos, tempo que o refresh expira
        }, 300000)
    },
    components: {
        Input,
        AdmSelecionarRoupa,
        Administrador,
        AdmSelecionarMarca
    },
    data() {
        return {
            username: '',
            password: '',
            loggedIn: false,
            isLoading: false,
            isSuperAdmin: false,
            adminsArray: undefined,
            editar: null,
            deletar: null,
            marca: false, // para editar ou deletar
            roupa: false  // para editar ou deletar
        }
    },
    methods: {
        async checkLoginStatus() {
            let endpoint = this.baseURL + 'usuarios/refresh/'
            try {
                const response = await axios.post(endpoint, {}, {
                    withCredentials: true
                })
                console.log(response.data)
                this.loggedIn = true
                await this.getAdminType()
                
                // Se há um redirect na query, vai para lá
                const redirect = this.$route.query.redirect
                if (redirect) {
                    // Usar replace ao invés de push para não criar histórico
                    this.$router.replace(redirect)
                }
            } catch (error) {
                console.error('Erro: ' + error)
                this.loggedIn = false
            }
        },
        enviarLogin(e) {
            e.preventDefault();
            this.isLoading = true;
            let endpoint = this.baseURL + 'usuarios/login/'
            axios.post(endpoint, {
                username: this.username,
                password: this.password
            }, {
                withCredentials: true
            }).then(async (response) => {
                console.log(response.data)
                this.loggedIn = true;
                this.isLoading = false;
                await this.getAdminType();
                
                // Redirecionar para a página solicitada ou permanecer no dashboard
                const redirect = this.$route.query.redirect
                if (redirect) {
                    this.$router.replace(redirect)
                }
            }).catch((error) => {
                alert('Erro: ' + error.response.data?.non_field_errors[0])
                this.isLoading = false;
            })
        },
        logOut() {
            let endpoint = this.baseURL + 'usuarios/logout/'
            axios.post(endpoint, {}, {
                withCredentials: true
            }).then(response => {
                console.log(response.data.message);
                this.loggedIn = false;
            }).catch(error => {
                console.log(error.response);
            })
        },
        toggleSection(secao, tipo) {
            secao == 'deletar' ? this.deletar = true : this.editar = true
            tipo == 'roupa' ? this.roupa = true : this.marca = true
            console.log('secao:', secao)
            console.log('tipo:', tipo)
        },
        async getAdminType() {
            // tem que fazer com try/catch por ser assíncrono aqui
            let endpoint = this.baseURL + 'usuarios/me/'
            try {
                const response = await axios.get(endpoint, {
                    withCredentials: true
                });
                this.username = response.data.username
                let tipo = response.data.tipo
                if (tipo == 'admin') {
                    this.isSuperAdmin = true;
                    // puxar lista de ADMS
                    let endpoint = this.baseURL + 'usuarios/list/'
                    axios.get(endpoint, { withCredentials: true }).then(response => {
                        console.log(response.data.results)
                        this.adminsArray = response.data.results
                    })
                }
                return response;
            }
            catch (error){
                console.log(error)
                return error
            }
        }
    }
}
</script>
<template>
    <main v-if="!loggedIn">
        <h1>Login para Administradores</h1>
        <form action="" @submit="enviarLogin">
            <Input campo="username" v-model="username"></Input>
            <Input campo="password" senha v-model="password"></Input>
            <button type="submit" :class="{ disabled: isLoading }">Enviar</button>
        </form>
    </main>
    
    <!-- escolher roupa p/ editar ou deletar -->
    <main v-else-if="editar || deletar">
        <AdmSelecionarRoupa v-if="roupa" :editar :deletar></AdmSelecionarRoupa>
        <AdmSelecionarMarca v-if="marca" :editar :deletar></AdmSelecionarMarca>
    </main>

    <!-- se tiver logado -->
    <main v-else-if="loggedIn">
        <h1>Bem vindo de volta, {{ username }}!</h1>
        <nav>
            <section class="roupa">
                <h3>Roupas</h3>
                <router-link to="/admRoupa">Criar roupas</router-link>
                <button class="function" @click="toggleSection('editar', 'roupa')">Editar roupa</button>
                <button class="function" @click="toggleSection('deletar', 'roupa')">Deletar roupa</button>
            </section>
            <section class="marca">
                <h3>Marcas</h3>
                <router-link to="/admMarca">Criar marcas</router-link>
                <button class="function" @click="toggleSection('editar', 'marca')">Editar marca</button>
                <button class="function" @click="toggleSection('deletar', 'marca')">Deletar marca</button>
            </section>
            <section class="adms" v-if="isSuperAdmin">
                <h3>Administradores ({{ this.adminsArray?.length }})</h3>
                <div class="admsContainer">
                    <Administrador v-for="adm in adminsArray"
                        :adm :key="adm.id"
                    ></Administrador>
                </div>
                <router-link to="/create-adm" title="Criar administrador">+</router-link>
            </section>
        </nav>
        <button class="logOut" @click="logOut">Sair da conta</button>
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

    nav {
        display: flex;
        gap: 2em;
        flex-wrap: wrap;
        justify-content: center;
        /* sections */
        > * {
            display: flex;
            flex-direction: column;
            gap: .5em;
            align-items: center;
            border: 2px solid var(--rosewood-light);
            padding: 1em;
            border-radius: .5em;
            max-width: 90vw;
            height: fit-content;
        }
        
        h3 {
            font-weight: normal;
            text-transform: uppercase;
        }
    }

    .logOut {
        padding: 1em;
        display: flex;
        align-items: center;
        margin-top: 1em;
        height: 2em;
        background-color: var(--rosewood);
        color: white;
        border: 1px solid black;
        border-radius: 8px;
        cursor: pointer;
        transition: 200ms ease;
        &:hover {
            background-color: var(--rosewood-light);
        }
    }

    a, button.function {
        color: var(--rosewood-light);
        font-size: 1.25rem;
        text-decoration: underline;
        border: none;
        font-family: "Degular";
        cursor: pointer;
        background: transparent;
        &:hover {color: var(--rosewood);}
    }

    .adms a {
        background-color: var(--rosewood);
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 1;
        font-size: 1.5em;
        width: 32px;
        height: 32px;
        border-radius: 1000px;
        color: var(--off-white);
        text-decoration: none;
        transition: 200ms ease;
        &:hover {
            color: var(--off-white) !important;
            scale: 1.1;
            background-color: var(--rosewood-light);
        }
    }

    .admsContainer {
        display: flex;
        flex-direction: column;
        gap: .5em;
        max-height: 155px;
        overflow-x: hidden;
        overflow-y: scroll;
        &::-webkit-scrollbar{
            background-color: transparent;
            width: 6px;
        }

        &::-webkit-scrollbar-track{
            background: transparent;
        }

        &::-webkit-scrollbar-thumb {
            background: rgba(0,0,0,.4);
            border-radius: 1000px;
        }
    }

    .dark .admsContainer::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,.4);
    }

    .dark a, .dark button.function {
        color: var(--off-white);
        &:hover { color: var(--rosewood-light); }    
    }
</style>