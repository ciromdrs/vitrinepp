<script>
import RoupaContainer from './RoupaContainer.vue'
export default {
    components: {
        RoupaContainer
    },
    props: {
        roupas: Array
    }
}
</script>

<template>
    <section class="descubra">
        <h1>Descubra</h1>
        <h3>Peças de diversas marcas e designers.</h3>
        <RoupaContainer :roupas="roupas"></RoupaContainer>
    </section>
</template>

<style scoped>
    h1 {
        font-size: 3em;
        text-transform: uppercase;
        height: fit-content;
        line-height: 1;
    }
    
    h3 {
        font-weight: 500;
        line-height: 1;
        margin-bottom: 1em;
    }
    
</style>