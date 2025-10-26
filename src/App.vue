<script setup lang="ts">
    import { ref } from 'vue'

    // Interface para definir a estrutura de um objeto de tarefa
    interface Todo {
        id: number
        text: string
        completed: boolean
    }

    // Estado reativo para a lista de tarefas e para o texto da nova tarefa
    let id = 0
    const newTodo = ref('')
    const todos = ref<Todo[]>([
        { id: id++, text: 'Aprender Vue.js', completed: false },
        { id: id++, text: 'Criar um projeto incrível', completed: false }
    ])

    /**
     * Adiciona uma nova tarefa à lista.
     * A função é chamada quando o formulário é submetido.
     * Não adiciona tarefas com texto vazio.
     */
    function addTodo() {
    if (newTodo.value.trim() !== '') {
        todos.value.push({
            id: id++,
            text: newTodo.value,
            completed: false
        })
        newTodo.value = '' // Limpa o campo de input após adicionar
    }
    }

    /**
     * Remove uma tarefa da lista com base no seu id.
     * @param {Todo} todo - O objeto da tarefa a ser removida.
     */
    function removeTodo(todo: Todo) {
        todos.value = todos.value.filter((t) => t.id !== todo.id)
    }
</script>

<template>
    <div id="todo-app">
        <h1>Minha Lista de Tarefas</h1>

        <form @submit.prevent="addTodo">
            <input v-model="newTodo" placeholder="Adicionar uma nova tarefa..." />
            <button>Adicionar</button>
        </form>

        <ul>
            <li v-for="todo in todos" :key="todo.id" :class="{ completed: todo.completed }">
                <input type="checkbox" v-model="todo.completed" />
                <span>{{ todo.text }}</span>
                <button @click="removeTodo(todo)">Remover</button>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    #todo-app {
        max-width: 500px;
        margin: 40px auto;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        font-family: sans-serif;
    }

    h1 {
        text-align: center;
        color: #2c3e50;
    }

    form {
        display: flex;
        margin-bottom: 20px;
    }

    form input {
        flex: 1;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    form button {
        padding: 10px 15px;
        border: none;
        background-color: #42b983;
        color: white;
        border-radius: 4px;
        margin-left: 10px;
        cursor: pointer;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        display: flex;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
    }

    li.completed span {
        text-decoration: line-through;
        color: #999;
    }

    li input[type='checkbox'] {
        margin-right: 10px;
    }

    li span {
        flex: 1;
    }

    li button {
        background-color: #e74c3c;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
    }
</style>