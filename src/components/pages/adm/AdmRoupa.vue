<script>
import Input from '../../Input.vue';
import Tamanho from '../../Tamanho.vue';
import RoupaDetalhes from '../../RoupaDetalhes.vue';
import axios from 'axios'
import getRefreshToken from '../../../data/functions';
import { authService } from '@/services/authService';

export default {
    // Verificar se tem token, senão manda pra admLogin (/adm)
    async mounted() {
        const isAuthenticated = await authService.checkAuth();
        console.log(isAuthenticated)
        if(!isAuthenticated) {
            console.log('nao ta autenticado')
            this.$router.replace('/adm')    
        }
        // checar se tá logado
        if (this.baseURL) {
            getRefreshToken(this.baseURL)
            setInterval(() => {
                getRefreshToken(this.baseURL) // Executar a cada 5 minutos, tempo que o refresh expira
            }, 300000)

            // Pegar as marcas
            let urlMarcas = this.baseURL + 'marcas/'
            axios(urlMarcas).then(response => {
                this.marcas = response.data.results
            }).catch(error => {
                console.error('Erro ao carregar marcas:', error)
            })
        }
    },
    components: {
        Input,
        Tamanho,
        RoupaDetalhes
    },
    data() {
        return {
            generos: ['masculino', 'feminino', 'unissex'],
            tamanhosTotal: [],
            marcas: [],
            roupa: {
                nome: '',
                descricao: '',
                preco: '',
                destaque: false,
                img: '',
                marca: null,
                extraImgs: [],
                tamanhos: [],
                genero: ''
            }
        }
    },
    methods: {
        adicionarTamanho() {
            let input = document.getElementById('tamanhoInput');
            this.tamanhosTotal.push({
                nome: input.value
            })
            input.value = ''
        },
        enviarRoupa() {
            const endpoint = this.baseURL + 'roupas/produtos/'
            const formData = new FormData();

            formData.append('nome', this.roupa.nome);
            formData.append('descricao', this.roupa.descricao);
            formData.append('preco', this.roupa.preco);
            formData.append('destaque', this.roupa.destaque);
            formData.append('img', this.roupa.img.arquivo);
            formData.append('marca', this.roupa.marca.id);
            if(this.roupa.extraImgs.length) {
                this.roupa.extraImgs.forEach(imagem => {
                    formData.append('extraImgs', imagem.img)
                })
            }
            formData.append('tamanhos', JSON.stringify(this.roupa.tamanhos));
            formData.append('genero', this.roupa.genero)
            console.log([... formData.entries()])

            axios.post(endpoint, formData, {
                headers: {
                    'Content-type': 'multipart/form-data'
                },
                withCredentials: true
            }).then(response => {
                alert('Roupa criada!')
                console.log(response.data)

                // Resetar inputs
                this.roupa.nome = ''
                this.roupa.descricao = '',
                this.roupa.preco = '',
                this.roupa.destaque = false,
                this.roupa.img = '',
                this.roupa.extraImgs = [],
                this.roupa.tamanhos = [] // não reseta marcas nem gênero pq são inputs <select>
            }).catch(error => {
                console.log(error.response.data)
            })
        }
    },
    computed: {
        // preview da roupa
        roupaPreview() {
            return {
                nome: this.roupa.nome || '',
                descricao: this.roupa.descricao || '',
                preco: this.roupa.preco || '',
                destaque: this.roupa.destaque,
                img: this.roupa.img?.url || '',
                marca_nome: this.roupa.marca?.nome || '',
                extraImgs: this.roupa.extraImgs.map((e) => {
                    if(e) {
                        return {caminho: e.url}
                    }
                    return null
                }),
                tamanhos: this.roupa.tamanhos
            }
        }   
    }
}
</script>

<template>
    <div class="admin-roupa-page">
        <router-link to='/adm' class="back-link">← Voltar</router-link>
        <h1>Adicionar nova roupa</h1>
        <form action="" @submit.prevent="enviarRoupa">
            <Input campo="nome" v-model="roupa.nome"></Input>
            <Input campo="descrição" descrição v-model="roupa.descricao"></Input>
            <Input campo="preco" preco v-model="roupa.preco"></Input>
            <div class="destaqueContainer">
                <input type="checkbox" name="destaque" id="destaque" v-model="roupa.destaque">
                <label for="destaque">Destaque? (Roupa vai para Destaques na pág. principal)</label>
            </div>
            <Input campo="marca" marca v-model="roupa.marca" :marcas="this.marcas"></Input>
            <Input campo="genero" genero v-model="roupa.genero" :generos></Input>
            <div class="tamanhoInput">
                <label for="tamanhoInput">Adicionar tamanho (um de cada vez)</label>
                <div class="addContainer">
                    <input type="text" placeholder="Ex.: 'P', 'M', '32'" id="tamanhoInput">
                    <button class="add" @click="adicionarTamanho">Adicionar</button>
                </div>
            </div>
            <div class="inputContainer sizes">
                <p>Tamanhos disponíveis</p>
                <div class="tamanhos">
                    <div class="tamanho" v-for="tamanho in tamanhosTotal">
                        <label :for="tamanho.nome">
                            <Tamanho :tamanho="tamanho"></Tamanho>
                        </label>
                        <input type="checkbox" :name="tamanho" :id="tamanho.nome" :value="tamanho" v-model="roupa.tamanhos">
                    </div>
                </div>
            </div>
            <Input campo="imagem" imagem v-model="roupa.img"></Input>
            <Input campo="extraImgs" nome="Imagens extras (ex.: costas da roupa)" imagem v-model="roupa.extraImgs"></Input>
            <button type="submit">Enviar nova roupa</button>
        </form>
        
        <div class="preview-section">
            <h2>Preview</h2>
            <RoupaDetalhes v-if="roupa.nome" :roupa="roupaPreview"></RoupaDetalhes>
        </div>
    </div>
</template>

<style scoped>
    .admin-roupa-page {
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
        line-height: 1;
        text-transform: uppercase;
    }

    p {
        font-size: 1.25em;
        font-weight: 600;
        max-width: fit-content;
    }

    .tamanhosAdd {
        display: flex;
        flex-direction: column;
        gap: .5em;
        .addContainer {
            display: flex;
            gap: .5em;
            button {
                padding: .5em;
                background-color: var(--rosewood);
                color: white;
                border: 1px solid black;
                border-radius: 8px;
                cursor: pointer;
            }
        }
    }

    .tamanhos {
        display: flex;
        gap: 2em;
        flex-wrap: wrap;
    }

    input[type="checkbox"]{
        display: block;
    }

    .tamanho {
        display: flex;
        flex-direction: column;
        gap: .5em;
        input {
            width: 100%;
        }
    }

    .size, input[type="checkbox"] {
        cursor: pointer;
        transition: 200ms ease all;
    }

    .size {
        user-select: none;
        background-color: var(--off-white);
        color: var(--rosewood);
    }

    .tamanho:has(input[type="checkbox"]:checked) {
        .size {
            background-color: var(--rosewood);
            color: var(--off-white);
        }
    }

    .destaqueContainer {
        display: flex;
        gap: .5em;
        align-items: center;
        input{
            --size: 1.5em;
            width: var(--size);
            height: var(--size);
        }
    }

    .destaqueContainer:has(input:checked){
        color: var(--rosewood);
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