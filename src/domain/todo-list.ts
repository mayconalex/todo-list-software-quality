import type { Todo } from './todo';

export class TodoList {
  public todos: Todo[] = [];
  private nextId = 0;

  constructor() {
    this.add('Aprender Vue.js');
    this.add('Criar um projeto incrível');
  }

  public add(text: string): void {
    if (text.trim() !== '') {
      this.todos.push({
        id: this.nextId++,
        text: text,
        completed: false,
      });
    }
  }

  public remove(id: number): void {
    this.todos = this.todos.filter((t) => t.id !== id);
  }

  public getTodos(): Todo[] {
    return this.todos;
  }
}