<script setup lang="ts">
import { ref, reactive } from 'vue'
import { TodoList } from './domain/todo-list'

const model = reactive(new TodoList())

const newTodoText = ref('')

function handleAdd() {
    model.add(newTodoText.value)
    newTodoText.value = ''
}
</script>

<template>
    <div id="todo-app">
        <h1>Minha Lista de Tarefas</h1>

        <form @submit.prevent="handleAdd">
            <input v-model="newTodoText" placeholder="Adicionar uma nova tarefa..." />
            <button>Adicionar</button>
        </form>

        <ul>
            <li
                v-for="todo in model.getTodos()"
                :key="todo.id"
                :class="{ completed: todo.completed }"
            >
                <input type="checkbox" v-model="todo.completed" />
                <span v-html="todo.text"></span>
                <button @click="model.remove(todo.id)">Remover</button>
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
