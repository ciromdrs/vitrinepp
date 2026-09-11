<script>
import Input from '../../Input.vue';
import RoupaDetalhes from '../../RoupaDetalhes.vue';
import Tamanho from '../../Tamanho.vue';
import axios from 'axios'
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
        // checar se tá logado
        getRefreshToken(this.baseURL)
        setInterval(() => {
            getRefreshToken(this.baseURL) // Executar a cada 5 minutos, tempo que o refresh expira
        }, 300000)

        // Pegar ID da roupa
        this.roupaId = Number(this.$route.params.id)

        // Pegar as marcas
        let urlMarcas = this.baseURL + 'marcas/'
        axios(urlMarcas).then(response => {
            this.marcas = response.data.results
        })

        // Puxar roupa
        const endpoint = this.baseURL + `roupas/produtos/${this.roupaId}/`
        axios.get(endpoint).then(response => {
            let roupa = response.data
            this.roupa.nome = roupa.nome
            this.roupa.descricao = roupa.descricao
            this.roupa.preco = roupa.preco
            this.roupa.destaque = roupa.destaque
            this.roupa.img = { url: roupa.img }
            this.roupa.marca = { id: roupa.marca, nome: roupa.marca_nome }
            this.roupa.extraImgs = roupa.extraImgs.map(e => ({ url: e.caminho }))
            this.tamanhosTotal = roupa.tamanhos.map(t => ({ nome: t.nome || t }))
            this.roupa.tamanhos = roupa.tamanhos.map(t => ({ nome: t.nome || t }))
            this.roupa.genero = roupa.genero
        })
    },
    components: {
        Input,
        Tamanho,
        RoupaDetalhes
    },
    data() {
        return {
            roupaId: null,
            generos: ['masculino', 'feminino', 'unissex'],
            tamanhosTotal: [],
            marcas: [],
            roupa: {
                nome: '',
                descricao: '',
                preco: '',
                destaque: false,
                img: '',
                marca: {id: null, nome: ''},
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
            const endpoint = this.baseURL + `roupas/produtos/${this.roupaId}/`
            const formData = new FormData();
            let imgInput = document.getElementById('imagem')
            let extraImgsInput = document.getElementById('extraImgs')

            formData.append('nome', this.roupa.nome);
            formData.append('descricao', this.roupa.descricao);
            formData.append('preco', this.roupa.preco);
            formData.append('destaque', this.roupa.destaque);
            if (imgInput.value) formData.append('img', this.roupa.img.arquivo);
            formData.append('marca', this.roupa.marca.id);
            if(extraImgsInput.value) {
                this.roupa.extraImgs.forEach(imagem => {
                    formData.append('extraImgs', imagem.img)
                })
            }
            formData.append('tamanhos', JSON.stringify(this.roupa.tamanhos));
            formData.append('genero', this.roupa.genero)
            console.log([... formData.entries(), this.roupa.extraImgs])

            axios.put(endpoint, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                },
                withCredentials: true
            }).then(response => {
                alert('Roupa atualizada com sucesso!')
                console.log(response.data)
                // não reseta inputs
            }).catch(error => {
                console.error(error.response.data)
            })
        },
        clearExtraImgs() {
            this.roupa.extraImgs = []
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
    <main>
        <router-link to='/adm'>Voltar</router-link>
        <h1>Editar roupa</h1>
        <form action="" @submit.prevent="enviarRoupa">
            <Input campo="nome" v-model="roupa.nome"></Input>
            <Input campo="descrição" descrição v-model="roupa.descricao"></Input>
            <Input campo="preco" preco v-model="roupa.preco"></Input>
            <div class="destaqueContainer">
                <input type="checkbox" name="destaque" id="destaque" v-model="roupa.destaque">
                <label for="destaque">Destaque? (Roupa vai para Destaques na pág. principal)</label>
            </div>
            <Input campo="marca" marca pagEditar v-model="roupa.marca" :marcas="this.marcas" 
            :marcaNome="roupa.marca.nome"></Input>
            <Input campo="genero" genero v-model="roupa.genero" :generos></Input>
            <div class="tamanhosAdd">
                <label for="tamanhoInput">Adicionar tamanho (um de cada vez)</label>
                <div class="addContainer">
                    <input type="text" placeholder="Ex.: 'P', 'M', '32'" id="tamanhoInput">
                    <button type="button" class="add" @click="adicionarTamanho">Adicionar</button>
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
            <Input campo="imagem" imagem pagEditar v-model="roupa.img"></Input>
            <Input campo="extraImgs" nome="Imagens extras (ex.: costas da roupa)" imagem v-model="roupa.extraImgs"></Input>
            <button type="button" @click="clearExtraImgs" class="btn">Limpar imagens extra</button>
            <button type="submit">Atualizar roupa</button>
        </form>
        <RoupaDetalhes :roupa="roupaPreview"></RoupaDetalhes>
    </main>
</template>

<style scoped>
    a {
        color: var(--rosewood-light);
        font-size: 1.25em;
        width: fit-content;
        &:hover {color: var(--rosewood);}
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    main {
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

    .btn {
        width: 200px;
        padding: .5em 1em;
        background: var(--rosewood);
        color: var(--off-white);
        border-radius: .5em;
        border: 1px solid var(--text);
        cursor: pointer;
        transition: 200ms ease;
        &:hover { scale: 1.05 }
        &:active { scale: 0.95 }
    }
</style>