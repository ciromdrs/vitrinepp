<script>
import { BIconCaretDownFill } from 'bootstrap-icons-vue';

export default {
    data() {
        return {
            showDescription: false
        }
    },
    props: {
        descricao: String
    },
    components: {
        BIconCaretDownFill
    },
    methods: {
        showDesc() {
            this.showDescription = !this.showDescription
        }
    }
}
</script>
<template>
    <div class="description" :class="{ showDescription: showDescription }">
        <div class="descbtn" @click="showDesc">
            <p>Descrição</p>
            <BIconCaretDownFill></BIconCaretDownFill>
        </div>
        <p class="descText"> {{ descricao }} </p>
    </div>
</template>
<style scoped>
    .description {
        background-color: var(--rosewood);
        border-radius: .5em;
        color: var(--off-white);
        display: flex;
        flex-direction: column;
        max-width: 100%;
        box-sizing: border-box;

        .descbtn {
            display: flex;
            justify-content: space-between;
            font-size: 1.1em;
            padding: 1em;
            cursor: pointer;
        }   

        svg {
            transition: 200ms ease;
        }

        &.showDescription svg {
            transform: rotate(180deg);
        }

        .descText {
            white-space: normal;
            word-wrap: break-word;
            overflow-wrap: break-word;
            word-break: break-all;
        }

        > p {
            font-weight: 300;
            overflow: hidden;
            max-height: 0;
            transition: 200ms;
            padding: 0 1em;
            letter-spacing: .5px;
            white-space: normal;
            word-wrap: break-word;
            overflow-wrap: break-word;
        }
        &.showDescription > p {
            height: auto;
            border-top: 1px solid black;
            padding: 1em;
            max-height: 500px;
        }
    }
</style>