<script>
export default {
    props: {
        tamanho: Object
    }
}
</script>

<template>
    <div class="size">
        {{ tamanho.nome }}
    </div>
</template>

<style scoped>
.size {
    padding: .5em;
    border: 1px solid black;
    color: var(--off-white);
    background-color: var(--rosewood);
    width: 2.5em;
    height: 2.5em;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>