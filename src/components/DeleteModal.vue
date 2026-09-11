<script>
import { BIconArrowLeftSquare, BIconExclamationTriangleFill, BIconTrash } from 'bootstrap-icons-vue';
import axios from 'axios'

export default {
    components: {
        BIconArrowLeftSquare,
        BIconTrash,
        BIconExclamationTriangleFill
    },
    props: {
        modelValue: [String, Boolean],
        roupaDeletar: Object,
        marcaADeletar: Object,
        admin: Object
    },
    emits: [
        'update:modelValue'
    ],
    computed: {
        deleteModalShowing() {
            return this.modelValue
        }
    },
    methods: {
        closeModal() {
            this.$emit('update:modelValue', false);
        },
        deletarRoupa(id) {
            let endpoint = this.baseURL + `roupas/produtos/${id}/`
            axios.delete(endpoint, {
                withCredentials: true
            }).then(response => {
                console.log(response)
                alert('Roupa deletada com sucesso!')
                location.reload();
            }).catch(error => {
                console.error(error)
            })
        },
        deletarMarca(id) {
            let endpoint = this.baseURL + `marcas/${id}/`
            axios.delete(endpoint, {
                withCredentials: true
            }).then(response => {
                console.log(response)
                alert('Marca deletada com sucesso!')
                location.reload();
            }).catch(error => {
                console.error(error)
            })
        },
        deletarAdmin(id) {
            let endpoint = this.baseURL + `usuarios/detail/${id}/`
            axios.delete(endpoint, {
                withCredentials: true
            }).then(response => {
                console.log(response)
                window.alert('Usuário deletado com sucesso!');
                window.location.reload();
            }).catch(error => {
                console.log(error)
            })
        }
    },
}
</script>
<template>
    <!-- Deletar roupa -->
    <dialog v-if="deleteModalShowing && roupaDeletar" open>
        <article>
            <div class="top">
                <BIconExclamationTriangleFill class="floating"></BIconExclamationTriangleFill>
                <h1>Deseja realmente deletar essa peça?</h1>
            </div>
            <h3>Essa ação é irreversível</h3>
            <div class="info">
                <p>Nome da peça: {{ roupaDeletar.nome }}</p>
                <p>ID da peça: {{ roupaDeletar.id }}</p>
                <p>Marca da peça: {{ roupaDeletar.marca_nome }}</p>
            </div>
        </article>
        <div class="buttons">
            <button class="btn cancel" @click="closeModal">
                <BIconArrowLeftSquare></BIconArrowLeftSquare>
                Cancelar
            </button>
            <button class="btn confirm" 
                @click="deletarRoupa(this.roupaDeletar.id)">
                <BIconTrash></BIconTrash>
                Confirmar
            </button>
        </div>
    </dialog>

    <!-- Deletar marca -->
    <dialog v-else-if="deleteModalShowing && marcaADeletar" open>
        <article>
            <div class="top">
                <BIconExclamationTriangleFill class="floating"></BIconExclamationTriangleFill>
                <h1>Deseja realmente deletar essa marca?</h1>
            </div>
            <h3>Essa ação é irreversível</h3>
            <div class="info">
                <p>Nome da marca: {{ marcaADeletar.nome }}</p>
                <p>ID da marca: {{ marcaADeletar.id_marca }}</p>
                <p>Email associado à marca: {{ marcaADeletar.email }}</p>
            </div>
        </article>
        <div class="buttons">
            <button class="btn cancel" @click="closeModal">
                <BIconArrowLeftSquare></BIconArrowLeftSquare>
                Cancelar
            </button>
            <button class="btn confirm" 
                @click="deletarMarca(this.marcaADeletar.id_marca)">
                <BIconTrash></BIconTrash>
                Confirmar
            </button>
        </div>
    </dialog>

    <!-- Deletar admin -->
    <dialog v-else-if="deleteModalShowing && admin" class="admin" open>
        <article>
            <div class="top">
                <BIconExclamationTriangleFill class="floating"></BIconExclamationTriangleFill>
                <h1>Deseja realmente deletar administrador {{ admin.username }}?</h1>
            </div>
            <h3>Essa ação é irreversível</h3>
            <div class="info">
                <p>Nome de usuário: {{ admin.username }}</p>
                <p>ID do administrador: {{ admin.id }}</p>
            </div>
        </article>
        <div class="buttons">
            <button class="btn cancel" @click="closeModal">
                <BIconArrowLeftSquare></BIconArrowLeftSquare>
                Cancelar
            </button>
            <button class="btn confirm" 
                @click="deletarAdmin(this.admin.id)">
                <BIconTrash></BIconTrash>
                Confirmar
            </button>
        </div>
    </dialog>

    <!-- Background do pop-up -->
    <div v-if="deleteModalShowing" class="bg" @click="closeModal"></div>
</template>
<style scoped>
    .bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .8);
        z-index: 100;
    }

    dialog {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 1em 2em;
        background-color: var(--rosewood);
        color: var(--off-white);
        min-height: 200px;
        width: 350px;
        max-width: 90vw;
        border-radius: 1em;
        display: flex;
        gap: 2em;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        z-index: 101;
        border: 2px solid var(--off-white);
    }

    dialog.admin {
        width: 400px;
    }

    dialog[open] {
        animation: fadeIn 350ms ease-out forwards 1;
    }

    @keyframes fadeIn {
        from {
            transform: translate(-50%, -70%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%);
            opacity: 1;
        }
    }

    .floating {
        animation: floating infinite ease-in-out 1500ms alternate-reverse;
    }

    @keyframes floating {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(-6px);
        }
    }

    article {
        display: flex;
        flex-direction: column;
        gap: .5em;
    }

    .top {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: .5em;

        svg {
            font-size: 2.5em;
        }
    }

    h1 {
        line-height: 1;
        font-size: 1.75em;
        text-align: center;
        text-transform: uppercase;
    }

    h3 {
        font-weight: 200;
    }

    p {
        font-weight: 200;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .btn {
            box-shadow: 0 3px 8px rgba(0, 0, 0, .4);
            border: none;
            background-image: linear-gradient(to top right, var(--rosewood), var(--rosewood-light));
            border: 1px solid var(--off-white);
            color: var(--off-white);
            padding: .75em 1.25em;
            border-radius: .5em;
            display: flex;
            align-items: center;
            gap: .25em;
            cursor: pointer;
            transition: 200ms ease;

            > *:nth-child(1) {
                max-width: 0px;
                transition: 200ms ease;
            }
            &:hover {
                background-color: var(--off-white);
                background-image: none;
                color: black;
                > *:nth-child(1) { max-width: 100px; }
            }
        }
    }
</style>