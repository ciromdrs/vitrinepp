<script>
import { BIconEnvelope, BIconReply, BIconTelephone } from 'bootstrap-icons-vue'
import { VueImageZoomer } from 'vue-image-zoomer';
import 'vue-image-zoomer/dist/style.css';
import Tamanho from './Tamanho.vue';
import Descricao from './Descricao.vue';
import { ref, computed } from 'vue';
import { useNotification } from '@/composables/useNotification';

export default {
    props: {
        roupa: {
            type: Object,
            required: true
        }
    },
    components: {
        BIconEnvelope, 
        BIconReply,
        BIconTelephone,
        Tamanho,
        VueImageZoomer,
        Descricao
    },
    setup(props) {
        const { success, error } = useNotification();
        const imgIndex = ref(0);

        const imgs = computed(() => {
            if (!props.roupa) return [];
            let extraImagens = [];
            if (props.roupa.extraImgs) {
                props.roupa.extraImgs.forEach(element => {
                    extraImagens.push(element.caminho);
                });
            }
            return [props.roupa.img].concat(extraImagens);
        });

        const copyURL = async () => {
            try {
                await navigator.clipboard.writeText(window.location.href);
                success('URL copiado com sucesso!');
            } catch (e) {
                error('Erro ao copiar URL: ' + e.message);
            }
        };

        const passarParaImagem = (index) => {
            imgIndex.value = index;
        };

        const passarParaEsquerda = () => {
            if (imgIndex.value > 0) {
                imgIndex.value -= 1;
            }
        };

        const passarParaDireita = () => {
            if (imgIndex.value < (imgs.value.length - 1)) {
                imgIndex.value += 1;
            }
        };

        return {
            imgIndex,
            imgs,
            copyURL,
            passarParaImagem,
            passarParaEsquerda,
            passarParaDireita
        };
    }
}
</script>

<template>
    <section class="detalhes">
        <div class="breadcrumbs">/Loja/{{ roupa.id }}</div>
        <div class="roupa">
            <figure>
                <vue-image-zoomer 
                    :regular="imgs[imgIndex]"
                    :show-message="false"
                    alt="Imagem da roupa"
                    :show-message-touch="false"
                ></vue-image-zoomer>
                <div class="imgPagination" v-if="roupa.extraImgs && roupa.extraImgs.length">
                    <button class="pageArrow" @click="passarParaEsquerda"> < </button>
                    <div class="pagebtn" 
                        v-for="(img, index) in imgs"
                        :key="index"
                        @click="passarParaImagem(index)"
                        :class="{ active: imgIndex == index }"
                    ></div>
                    <button class="pageArrow" @click="passarParaDireita"> > </button>
                </div>
            </figure>
            <div class="details">
                <h1 class="name"> {{ roupa.nome }} </h1>
                <div class="sizes" v-if="roupa.tamanhos && roupa.tamanhos.length">
                    <h3>Tamanhos disponíveis</h3>
                    <div class="sizesContainer">
                        <Tamanho v-for="size in roupa.tamanhos" :key="size" :tamanho="size"></Tamanho>
                    </div>
                </div>
                <h4 class="valor">Valor: R${{ roupa.preco }}</h4>
                <Descricao :descricao="roupa.descricao"></Descricao>
                <div class="links">
                    <div class="phone">
                        <BIconTelephone />
                        <p>{{ roupa.marca_telefone }}</p>
                    </div>
                    <a class="email" :href="`mailto:${roupa.marca_email}`">
                        <BIconEnvelope></BIconEnvelope>
                        <p>Falar com {{ roupa.marca_nome }}</p>
                    </a>
                    <div class="share">
                        <BIconReply></BIconReply>
                        <p @click="copyURL">Compartilhar link</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
    .mostrar {
        background-color: red;
        width: 2em;
        height: 2em;
    }

    figure {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    .imgPagination {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1em;
        height: auto;
        aspect-ratio: unset;
    }

    .pageArrow {
        height: 1.25em;
        width: 1.25em;
        border-radius: 4px;
        background-color: var(--rosewood-light);
        border: rgba(0, 0, 0, .3) 1px solid;
        transition: 200ms ease all;
        box-shadow: 0 0 1px 4px rgba(0, 0, 0, .1);
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--off-white);
        padding: 1em;
        &:hover {
            scale: 1.05;
        }
        &:active {
            scale: 0.95;
        }
    }

    .pagebtn {
        height: 1em;
        width: 1em;
        border-radius: 1000px;
        background-color: var(--rosewood);
        border: rgba(0, 0, 0, .3) 1px solid;
        transition: 200ms ease all;
        box-shadow: 0 0 1px 4px rgba(0, 0, 0, .1);
        cursor: pointer;
    }

    .pagebtn.active {
        width: 1.25em;
        height: 1.25em;
        background-color: var(--rosewood-light);
    }

    .detalhes {
        max-width: 100vw;
        display: flex;
        flex-direction: column;
        gap: 1em;
        
    }

    .roupa {
        display: flex;
        gap: 2em;

        > * {
            flex: 1 1 50%;
        }
    }

    :deep(figure .vh--holder) {
        border: 2px solid black !important;
        width: 100%;
        background-color: var(--figure-bg);
        aspect-ratio: 1 / 1;
    }

    :deep(figure *) {
        width: 100%;
        aspect-ratio: 1 / 1;
    }

    .details {
        display: flex;
        flex-direction: column;
        flex: 1 1 70%;
        gap: 2em;
        max-height: 100%;
    }

    .name {
        font-size: 2em;
        font-weight: 600;
        border-bottom: 1px solid #c6c6c6;
    }

    .sizes {
        display: flex;
        flex-direction: column;
        gap: .5em;

        h3 {
            font-size: 1.2em;
            font-weight: 500;
        }

        .sizesContainer {
            display: flex;
            gap: 1em;
        }

    }

    .valor {
        font-size: 1.25em;
        font-weight: 400;
    }

    .links {
        margin-top: auto;
        display: flex;
        flex-direction: column;
        gap: .5em;

        > * {
            display: flex;
            align-items: center;
            gap: .5em;
            font-size: 1.25em;
            cursor: pointer;
            text-decoration: underline;

            svg {
                transition: 200ms ease;
            }
            &:hover svg {
                scale: 1.25;
            }
        }

        .email {
            color: var(--text);

        }
    }

    .roupa:has(.imgPagination) .details {
        padding-bottom: 2.5em;
    }

    @media (max-width: 650px) {
        .roupa {
            flex-direction: column;
        }

        .details {
            padding-bottom: 0 !important;
        }
    }
</style>