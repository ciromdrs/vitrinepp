<script>
export default {
    props: {
        marca: Object
    }
}
</script>
<template>
    <section class="marcaInfo">
        <h1>{{ marca.nome }}</h1>
        <div class="contato">
            <p class="email">{{ marca.email }}</p>
            <p class="telefone">{{ marca.telefone }}</p>
        </div>
        <div class="banner" :style="{ backgroundImage: `url(${marca.banner})` }">
            <figure class="perfil">
                <img :src="marca.foto_perfil" alt="Foto perfil">
            </figure>
        </div>
    </section>
</template>
<style scoped>
    .marcaInfo {
        display: flex;
        flex-direction: column;
        gap: .5em;
    }

    .contato {
        display: flex;
        color: var(--text);
        align-items: center;
        > *:nth-child(1)::after {
            content: '○';
            margin: .5em;
        }
        * {
            line-height: 1;
        }
    }

    .banner {
        --height: 250px;
        height: var(--height);
        width: 100%;
        border: 2px solid var(--text);
        display: flex;
        align-items: center;
        padding: 2em;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        animation: fadeOut 500ms ease 1 both;
    }

    .perfil {
        border-radius: 1000px;
        width: calc(var(--height) * .55);
        height: calc(var(--height) * .55);
        aspect-ratio: 1 / 1;
        border: 4px solid black;
        overflow: hidden;

        img {
            width: 100%;
            transition: 200ms ease;
            aspect-ratio: 1 / 1;
            &:hover {
                scale: 1.1;
            }
        }
    }

    
    @media (min-width: 750px) and (max-width: 900px) {
        .banner {
            --height: 200px;
        }
    }

    @media (min-width: 500px) and (max-width: 750px) {
        .banner {
            --height: 175px;
        }
    }

    @media (min-width: 350px) and (max-width: 500px) {
        .banner{
            --height: 150px;
            width: calc(100% + 2em);
            transform: translateX(-1em);
            padding: .5em;
        }
    }

    @media (max-width: 350px) {
        .banner{
            --height: 125px;
            width: calc(100% + 2em);
            transform: translateX(-1em);
            padding: .5em;
        }
    }

    @keyframes fadeOut {
        from {
            background-size: 250%
        }
        to {
            background-size: 100%;
        }
    }
</style>