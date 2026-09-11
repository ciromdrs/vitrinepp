<script>
import { landingImg } from '../data/roupas';
export default {
    data() {
        return {
            landingImg
        }
    },
}
</script>

<template>
    <section class="conecte">
            <figure>
                <img :src="landingImg" alt="Roupas/moda/fashion">
            </figure>
            <article>
                <h1>Conecte-se</h1>
                <h3>Ao público certo!</h3>
                <p>Dê o destaque necessário que o seu produto precisa para o mercado</p>

                <div class="cta">
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSchPs8-nlXfQLgsBprRwvOTDFO1UTcLKNTKRR0XFxpQUkEJwA/viewform?usp=header" target="_blank">
                        <button class="btn">Clique aqui!</button>
                    </a>
                </div>
            </article>
    </section>
</template>

<style scoped>
    .conecte {
        display: flex;
        gap: 1em;
        flex-wrap: wrap;

        > * {
            flex: 1 1 0;
        }
    }

    figure {
        border: 2px solid black;
        width: fit-content;
    }

    figure img {
        width: 100%;
        height: 100%;
    }

    article {
        text-align: right;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        font-size: 1.3em;

        h1 {
            font-size: 4.5em;
            text-transform: uppercase;
            font-weight: 600;
            position: relative;
            line-height: 1;
            &::before {
                content: '';
                position: absolute;
                bottom: 8px;
                left: 0;
                width: 100%;
                height: 2px;
                background-color: var(--text);
            }
        }

        h3 {
            text-transform: uppercase;
            font-size: 2em;
            font-weight: 400;
            line-height: 1;
        }

        p {
            width: 300px;
            font-weight: 400;
        }

        .cta {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;

            .btn {
                width: 275px;
                max-width: 90%;
                height: 60px;
                background-color: var(--rosewood);
                color: var(--off-white);
                border-radius: .25em;
                border: none;
                font-size: 1rem;
                position: relative;
                overflow: hidden;
                cursor: pointer;
                transition: 200ms ease;
                box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, .5);

                &:hover {
                    scale: 1.05;
                }
                &:active {
                    scale: 0.95;
                }

                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -72px;
                    height: 100%;
                    width: 100px;
                    transform: rotate(-45deg);
                    background-image: linear-gradient(to bottom, transparent, white, transparent);
                    filter: blur(20px);
                    transition: 200ms ease;
                }
                &:hover::before {
                    left: calc(100% - 32px);
                }
            }
        }
    }

    body.dark .btn {
        box-shadow: 0px 2px 16px 1px rgba(255, 255, 255, .2);
    }

    @media (max-width: 1200px) {
        article {
            font-size: 1em;
        }
        
        article .cta .btn {
            width: 245px;
            height: 50px;
            font-size: .9em;
        }
    }

    @media (max-width: 900px) {
        .conecte {
            flex-direction: column;
        }

        article {
            text-align: center;
            align-items: center;
            gap: .5em;

            .cta {
                justify-content: center;
                align-items: center;
            }
        }

    }

    @media (max-width: 405px) {
        article h1 {
            font-size: 3em;
        }
    }
</style>