<script>
import { BIconFunnel, BIconCaretDown, BIconSearch, BIconArrowRight } from 'bootstrap-icons-vue';
import RoupaContainer from '../RoupaContainer.vue';
import LoadingSpinner from '../common/LoadingSpinner.vue';
import ErrorDisplay from '../common/ErrorDisplay.vue';
import { ref, onMounted } from 'vue';
import { useRoupas } from '@/composables/useRoupas';

export default {
    components: {
        RoupaContainer,
        BIconCaretDown,
        BIconFunnel,
        BIconSearch,
        BIconArrowRight,
        LoadingSpinner,
        ErrorDisplay
    },
    setup() {
        const { roupas, isLoading, error, carregarRoupas } = useRoupas();
        
        const search = ref('');
        const filterBy = ref('-id');
        const filterName = ref('Mais recentes');
        const filterDisplaying = ref(false);
        const activeFilterIndex = ref(1);

        const filter = async () => {
            await carregarRoupas({
                search: search.value,
                ordering: filterBy.value
            });
        };

        const changeFilterParameters = async (newFilterBy, newFilterName, index) => {
            filterBy.value = newFilterBy;
            filterName.value = newFilterName;
            activeFilterIndex.value = index;
            await filter();
        };

        onMounted(() => {
            filter();
        });

        return {
            roupas,
            isLoading,
            error,
            search,
            filterBy,
            filterName,
            filterDisplaying,
            activeFilterIndex,
            filter,
            changeFilterParameters
        };
    }
}
</script>

<template>
    <main>
        <LoadingSpinner :isLoading="isLoading" message="Carregando roupas..." />
        
        <section class="top">
            <div class="breadcrumbs">Loja/Novidades</div>
            <h1 class="title">Novidades</h1>
            <div class="filterNav">
                <div>
                    <BIconFunnel></BIconFunnel>
                    <p>Filtro</p>
                </div>
                <div class="searchContainer">
                    <div class="searchbar">
                        <input type="text" v-model="search" @input="filter" placeholder="Pesquisar roupas" name="search"
                            id="search">
                        <BIconSearch></BIconSearch>
                        <BIconArrowRight @click="filter"></BIconArrowRight>
                    </div>
                    <p>{{ roupas.length }} peças</p>
                </div>
                <div class="type" @click="filterDisplaying = !filterDisplaying">
                    <p>{{ filterName }}</p>
                    <BIconCaretDown :class="{ up: filterDisplaying }"></BIconCaretDown>
                </div>
            </div>
        </section>
        
        <section class="filtering" :aria-hidden="!filterDisplaying" :class="{ hidden: !filterDisplaying }">
            <h1>Filtrar por:</h1>
            <div class="filtrosContainer">
                <button class="filtro" 
                    @click="changeFilterParameters('-id', 'Mais recentes', 1), filterDisplaying = !filterDisplaying"
                    :class="{ current: activeFilterIndex == 1}">Mais recentes</button>
    
                <button class="filtro" 
                    @click="changeFilterParameters('id', 'Mais antigos', 2), filterDisplaying = !filterDisplaying"
                    :class="{ current: activeFilterIndex == 2}">Mais antigos</button>
    
                <button class="filtro" 
                    @click="changeFilterParameters('-n_visualizacoes', 'Mais vistos', 3), filterDisplaying = !filterDisplaying"
                    :class="{ current: activeFilterIndex == 3}">Mais vistos</button>
    
                <button class="filtro" 
                    @click="changeFilterParameters('n_visualizacoes', 'Menos Vistos', 4), filterDisplaying = !filterDisplaying"
                    :class="{ current: activeFilterIndex == 4}">Menos vistos</button>
    
                <button class="filtro" 
                    @click="changeFilterParameters('-preco', 'Preço: maior', 5), filterDisplaying = !filterDisplaying"
                    :class="{ current: activeFilterIndex == 5}">Preço: Maior</button>
    
                <button class="filtro" 
                    @click="changeFilterParameters('preco', 'Preço: menor', 6), filterDisplaying = !filterDisplaying"
                    :class="{ current: activeFilterIndex == 6}">Preço: Menor</button>
            </div>
        </section>
        
        <ErrorDisplay 
            v-if="error && !isLoading" 
            :error="error"
            :showRetry="true"
            @retry="filter"
        />
        
        <RoupaContainer v-if="!error" :roupas="roupas"></RoupaContainer>
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    gap: 2em;
}

.top {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

h1 {
    font-size: 3em;
    text-transform: uppercase;
    line-height: 1;
}

.filterNav {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1em;

    >* {
        display: flex;
        align-items: center;
        gap: .25em;
    }

    .type {
        text-transform: uppercase;
        cursor: pointer;
        display: flex;
        width: 125px;
        justify-content: flex-end;
    }
}

.searchContainer {
    display: flex;
    flex-direction: column;
    position: relative;
    flex-grow: 1;

    >p {
        color: var(--subtext);
        position: absolute;
        bottom: -1.5em;
    }
}

.searchbar {
    display: flex;
    align-items: center;
    border: 2px solid var(--rosewood);
    border-radius: .5em;

    input {
        border: none;
        width: 200px;
        transition: 200ms ease;
        border-radius: .5em 0 0 .5em;
        max-width: 70vw;

        &:focus,
        &:active {
            width: 250px;
            border: none;
            outline: none;
        }
    }

    svg {
        overflow: hidden;
        transition: 200ms ease all;
        color: var(--off-white);
        background-color: var(--rosewood);
        height: 23px;
        border-top-right-radius: .3em;
        border-bottom-right-radius: .3em;
        padding: 0 .5em;
        width: 2em;
    }

    svg:nth-child(2) {
        display: block;
    }

    svg:nth-child(3) {
        display: none;
    }
}

.searchbar:has(input:not(:placeholder-shown)) {
    border: 2px solid var(--rosewood-light);

    input {
        width: 250px;
    }

    svg:nth-child(2) {
        display: none;
    }

    svg:nth-child(3) {
        display: block;
        background-color: var(--rosewood-light);
        cursor: pointer;
    }
}

.filtering {
    transition: 200ms ease all;
    max-height: 500px;
    display: flex;
    flex-direction: column;
    gap: 1em;
    background-color: var(--off-main);
    border: 4px solid var(--rosewood);
    border-radius: 1em;
    align-items: center;
    justify-content: center;
    padding: 1em;


    h1 {
        font-size: 2em;
        color: var(--text);
    }
}

.dark .filtering{
    box-shadow: 0 0 16px 4px rgba(255,255,255,.05);
    border: 4px solid var(--rosewood-light)
}

.filtrosContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 1em;
    margin: auto;
    padding-block: 1em;
    border-radius: .5em;

    button {
        background-color: var(--off-main);
        border: 2px solid var(--rosewood);
        color: var(--text);
        padding: .5em;
        width: 125px;
        border-radius: 1000px;
        cursor: pointer;
        transition: 200ms ease;
        box-shadow: 0 0 4px 2px rgba(0,0,0,.3);

        &:hover {
            color: var(--rosewood-light);
        }
    }

    .current {
        background-color: var(--rosewood);
        color: var(--off-white);
        border: 2px solid var(--rosewood-light);
        &:hover {
            background-color: var(--rosewood-light);
            color: var(--off-white);
        }
    }
}

.hidden {
    max-height: 0px;
    overflow: hidden;
    visibility: hidden;
    padding: 0;
    border: 0px;
    transition: 200ms ease;
}

svg {
    transition: 200ms ease;
    rotate: 0deg;
}

svg.up {
    rotate: 180deg;
    transition: 200ms ease;
}

@media (max-width: 600px) {
    .filterNav > *:nth-child(1) {
        display: none;
        visibility: hidden;
    }

    .filterNav {
        gap: 3em;
        justify-content: center;
    }
}

</style>