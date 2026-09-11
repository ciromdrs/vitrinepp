<script>
import { BIconInstagram, BIconEnvelope, BIconGeoAlt } from 'bootstrap-icons-vue'
export default {
    components: {
        BIconInstagram,
        BIconEnvelope,
        BIconGeoAlt
    }
}
</script>
<template>
    <footer>
        <div class="infos">
            <h2>Mais infos</h2>
            <div class="link">
                <p>Localização</p>
                <a href="https://maps.app.goo.gl/6m1bjJGWJPjrW6736" target="_blank">
                    <BIconGeoAlt></BIconGeoAlt>
                    Rodovia RN 288, s/n, Nova Caicó - Caicó-RN
                </a>
            </div>
            <div class="link">
                <p>Contato</p>
                <a>
                    <BIconEnvelope></BIconEnvelope>
                    vitrinepp24@gmail.com
                </a>
            </div>
            <div class="link">
                <p>Redes sociais</p>
                <a href="https://www.instagram.com/vitrinepp/" target="_blank">
                    <BIconInstagram></BIconInstagram>
                    @vitrinepp
                </a>
                <a href="https://www.instagram.com/modaifrn/" target="_blank">
                    <BIconInstagram></BIconInstagram>
                    @modaifrn
                </a>
            </div>
        </div>
        <div class="logo">
            <img src="/vitriFavicon.PNG" alt="Logo">
        </div>
    </footer>
</template>
<style scoped>
    footer {
        min-height: 250px;
        padding: 2em;
        display: flex;
        gap: 1em;
        font-size: 1.2em;
        margin-top: auto;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        flex-shrink: 0;
    }

    .infos {
        display: flex;
        flex-direction: column;
        line-height: 1;
        gap: .5em;

        h2 {
            text-transform: uppercase;
            font-size: 2.5em;
        }

        .link a {
            color: var(--text);
            display: flex;
            align-items: center;
            gap: .25em;
            margin-top: .2em;
            text-decoration: underline;
            &:hover {
                color: var(--rosewood-light);
            }
        }

        .link p {
            text-transform: uppercase;
            font-weight: 600;
            font-size: 1.1em;
            line-height: 1.1;
        }
    }

    footer img {
        height: 250px;
    }

    @media (max-width: 550px) {
        footer {
            font-size: 1em;
            flex-direction: column;
        }
    }
</style>