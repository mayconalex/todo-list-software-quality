import type { Todo } from './todo'

/* eslint-disable no-magic-numbers */
export enum Prioridade {
    BAIXA = 1,
    MEDIA = 2,
    ALTA = 3,
}
/* eslint-enable no-magic-numbers */

export interface FiltroTodo {
    termoBusca?: string
    apenasPendentes?: boolean
    prioridadeMinima?: Prioridade
    ordenarPorPrioridade?: boolean
}

export class TodoList {
    public todos: Todo[] = []
    private nextId = 0

    constructor() {
        this.add('Aprender Vue.js', Prioridade.ALTA)
        this.add('Criar um projeto incrível', Prioridade.MEDIA)
        this.add('Dormir um pouco', Prioridade.BAIXA)
    }

    public add(text: string, priority: Prioridade = Prioridade.BAIXA): void {
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

    public processarExpressao(texto: string): number | null {
        const match = texto.match(/(\d+[\+\-\*\/]\d+)/)

        if (match) {
            const conta = match[0]

            return eval(conta)
        }

        return null
    }

    private possuiTexto(t: Todo, termo?: string): boolean {
        if (!termo) return true

        const regex = new RegExp(termo, 'i')
        return regex.test(t.text)
    }

    private ehPendente(t: Todo, apenasPendentes?: boolean): boolean {
        if (!apenasPendentes) return true
        return !t.completed
    }

    private temPrioridade(t: Todo, minima?: Prioridade): boolean {
        if (!minima) return true
        return t.priority >= minima
    }

    public filtrarTarefas(filtro: FiltroTodo): Todo[] {
        let resultado = this.todos.filter(
            (t) =>
                this.possuiTexto(t, filtro.termoBusca) &&
                this.ehPendente(t, filtro.apenasPendentes) &&
                this.temPrioridade(t, filtro.prioridadeMinima),
        )

        if (filtro.ordenarPorPrioridade) {
            resultado = [...resultado].sort((a, b) => b.priority - a.priority)
        }

        return resultado
    }
}
