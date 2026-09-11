<script>
import { BIconPencilSquare, BIconPersonPlus, BIconPersonX } from 'bootstrap-icons-vue';
import DeleteModal from './DeleteModal.vue';

export default {
    components: {
        BIconPencilSquare,
        BIconPersonX,
        BIconPersonPlus,
        DeleteModal
    },
    props: {
        adm: Object
    },
    data() {
        return {
            deleteModalShowing: false,
        }
    }
}
</script>
<template>
    <div class="admin">
        <p class="user">{{ adm.username }}</p>
        <router-link :to="`/editarStaff/${adm.id}`" title="Editar admin">
            <BIconPencilSquare></BIconPencilSquare>
        </router-link>
        <button title="Deletar admin" @click="deleteModalShowing = !deleteModalShowing">
            <BIconPersonX></BIconPersonX>
        </button>
        <DeleteModal v-model="deleteModalShowing" :admin="adm"></DeleteModal>
    </div>
</template>
<style scoped>
    .admin { 
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: .5em 1em;
        min-width: 200px;
        max-width: 90%;
        height: 2em;
        border-radius: .5em;
        border: 1px solid var(--rosewood-light);
        gap: .5em;

        .user {
            margin-right: auto;
        }

        button {
            padding: 0;
            margin: 0;
            border: 0;
            display: flex;
            align-items: center;
            background-color: transparent;
            cursor: pointer;
        }

        svg {
            font-size: 1.1rem;
            color: var(--text);
            fill: var(--text);
        }

        a {
            display: flex;
            align-items: center;
        }

        a:hover, button:hover {
            scale: 1.1;
        }

        a:active, button:active {
            scale: 0.95;
        }
    }
</style>