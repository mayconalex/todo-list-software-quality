import type { Todo } from './todo'

export class TodoList {
    public todos: Todo[] = []
    private nextId = 0

    constructor() {
        this.add('Aprender Vue.js', 3)
        this.add('Criar um projeto incrível', 2)
        this.add('Dormir um pouco', 1)
    }

    public add(text: string, priority: number = 1): void {
        if (text.trim() !== '') {
            this.todos.push({
                id: this.nextId++,
                text: text,
                completed: false,
                priority: priority,
            })
        }
    }

    public remove(id: number): void {
        this.todos = this.todos.filter((t) => t.id !== id)
    }

    public getTodos(): Todo[] {
        return this.todos
    }

    public filtrarTarefas(
        termoBusca: string,
        apenasPendentes: boolean,
        prioridadeMinima: number,
        ordenarPorPrioridade: boolean,
    ): Todo[] {
        let resultado = this.todos

        // Filtro de texto
        if (termoBusca !== '') {
            resultado = resultado.filter((t) => t.text.includes(termoBusca))
        }

        // Filtro de status
        if (apenasPendentes) {
            resultado = resultado.filter((t) => !t.completed)
        }

        // Filtro de prioridade
        if (prioridadeMinima > 0) {
            resultado = resultado.filter((t) => {
                if (prioridadeMinima === 3) {
                    return t.priority === 3
                } else if (prioridadeMinima === 2) {
                    return t.priority >= 2
                } else {
                    return true
                }
            })
        }

        // Ordenação
        if (ordenarPorPrioridade) {
            resultado.sort((a, b) => {
                if (a.priority > b.priority) return -1
                if (a.priority < b.priority) return 1
                return 0
            })
        }

        return resultado
    }
}
