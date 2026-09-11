<script>
import MarcasContainer from './MarcasContainer.vue';
import { marcas } from '../data/roupas';

export default {
    props: {
        marcas: Array
    },
    components: {
        MarcasContainer
    }
}
</script>
<template>
    <section class="popular">
        <h2>Marcas mais visitadas</h2>
        <MarcasContainer
            :marcas="marcas.slice(0, 4)"
        ></MarcasContainer>
    </section>
</template>

<style scoped>
    .popular {
        display: flex;
        flex-direction: column;
        gap: .5em;
    }

    h2 {
        text-transform: uppercase;
        font-size: 1.75em;
    }

    :deep(.container) {
        justify-content: space-around;
    }

    :deep(.marca figure) {
        width: 175px;
        height: 175px;
    }
</style>