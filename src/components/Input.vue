<script>
export default {
    props: {
        campo: String,
        marcas: {
            type: Array,
            required: false,
            default: undefined
        },
        generos: {
            type: Array,
            required: false,
            default: undefined
        },
        nome: {
            type: String,
            default: ''
        },
        descrição: {
            type: Boolean,
            default: false
        },
        imagem: {
            type: Boolean,
            default: false
        },
        modelValue: [String, File, FileList, Object],
        email: {
            type: Boolean,
            default: false
        },
        telefone: {
            type: Boolean,
            default: false
        },
        senha: {
            type: Boolean,
            default: false
        },
        marca: {
            type: Boolean,
            default: false
        },
        genero: {
            type: Boolean,
            default: false
        },
        preco: {
            type: Boolean,
            default: false
        },
        pagEditar: {
            type: Boolean,
            required: false
        },
        marcaNome: String
    },
    methods: {
        trocarImagem(e) {
            const arquivos = e.target.files;
            const arquivo = arquivos[0]
            const url = URL.createObjectURL(arquivos[0]);
            this.$emit('update:modelValue', {
                arquivo,
                url
            })
        },
        formatarNumero(number) {
            const cleaned = number.replace(/\D/g, '');
            let formatted = '';

            if (cleaned.length > 0) {
                formatted = '(' + cleaned.substring(0, 2); // DDD
            }
            if (cleaned.length >= 3) {
                formatted += ') ' + cleaned.substring(2, 7);
            }
            if (cleaned.length >= 8) {
                formatted += '-' + cleaned.substring(7, 11);
            }

            return formatted;
        },
        formatarTelefone(e) {
            let formatado = this.formatarNumero(e.target.value)
            this.$emit('update:modelValue', formatado);
        },
        formatarPreco(e){
            let valor = e.target.value;
            let cleaned = valor.replace(/\D/g, '');
            let formatado = parseFloat(cleaned/100).toLocaleString('pt-BR', {
                style: "decimal",
                currency: 'BRL',
                minimumFractionDigits: 2
            })
            e.target.value = formatado

            this.$emit('update:modelValue', formatado);
        },
        adicionarImagens(e) {
            const arrayArquivos = e.target.files
            const arrayImgFiles = Array.from(arrayArquivos);
            let extraImagens = []
            arrayImgFiles.forEach((img) => {
                const url = URL.createObjectURL(img)
                extraImagens.push({ url, img })
            })
            console.log(extraImagens);
            this.$emit('update:modelValue', extraImagens)
        }
    },
    emits: [
        'update:modelValue'
    ]
}
</script>

<template>
    <div class="inputContainer">
        <label :for="campo" v-if="campo == 'marca' && pagEditar">Marca atual: {{ marcaNome }}</label>
        <label :for="campo" v-else-if="nome">{{ nome }}</label>
        <label :for="campo" v-else>{{ campo }}</label>

        <!-- Descrição -->
        <textarea name="descrição" id="descrição" v-if="descrição" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)">></textarea>

        <!-- Imagem -->
        <div class="imginput" v-else-if="imagem">
            <input type="file" v-if="this.campo == 'extraImgs'" :name="campo" :id="campo" accept="image/*"
                @change="adicionarImagens" multiple>
            <input type="file" v-else :name="campo" :id="campo" accept="image/*" @change="trocarImagem" :required="!pagEditar">
        </div>

        <!-- Seleção (p/ escolher marca da roupa) -->
        <select 
           :name="campo" :id="campo" v-else-if="marca"
           @change="$emit('update:modelValue', {
            id: $event.target.value,
            nome: marcas.find(m => m.id_marca == $event.target.value).nome || ''
           }), console.log($event.target.value)" :required="!pagEditar">

           <option value="">-</option>
           <!-- p/ marcas -->
           <option :value="marca.id_marca"
               v-for="marca in marcas" 
               >{{ marca.id_marca }} - {{ marca.nome }}</option>

        </select>

        <!-- Seleção (p/ escolher categoria da orupa) -->
         <select 
            :name="campo" :id="campo" v-else-if="genero"
            @change="$emit('update:modelValue', $event.target.value), console.log($event.target.value)">

            <option value="">-</option>
            <!-- p/ categoria -->
            <option :value="genero"
                v-for="genero in generos">{{ genero }}</option>

         </select>

        <!-- Email -->
        <input type="email" v-else-if="email" required :id="campo" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)">

        <!-- Senha -->
        <input type="password" v-else-if="senha" required :id="campo" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)">

        <!-- Telefone -->
        <input required type="tel" :name="campo" :id="campo" v-else-if="telefone" :value="modelValue" maxlength="15"
            placeholder="(xx) xxxxx-xxxx" @input="formatarTelefone">

        <!-- Preco -->  
        <input required type="text" :name="campo" :id="campo" v-else-if="preco" 
            :value="modelValue" @input="formatarPreco">

        <!-- Genérico -->
        <input required type="text" :name="campo" :id="campo" v-else :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)">
    </div>
</template>

<style>
.inputContainer {
    display: flex;
    flex-direction: column;
    gap: .25em;
}

label {
    font-size: 1.25em;
    font-weight: 600;
    max-width: fit-content;
}

label::first-letter {
    text-transform: uppercase;
}

input, select {
    padding: .25em .75em;
    border: 2px solid var(--rosewood);
    border-radius: .5em;
}

textarea {
    width: 100%;
    height: auto;
    height: 100px;
    padding: .25em .75em;
    border: 2px solid var(--rosewood);
    border-radius: .5em;
    font-family: Arial, Helvetica, sans-serif;
}
</style>