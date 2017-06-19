import { StoreBase, AutoSubscribeStore, autoSubscribe } from 'resub';
import { Todo } from '../types';

@AutoSubscribeStore
class TodosStore extends StoreBase {
    private _todos: Todo[] = [];
    private _nextID: number = 0;
    private _showComplete: boolean = true;

    addTodo(name: string) {
        const todo: Todo = {
            id: this._nextID,
            name,
            completed: false,
        };
        this._nextID++;

        // Don't use .push here, we need a new array since the old _todos array was passed to the component by reference value
        this._todos = this._todos.concat(todo);
        this.trigger();
    }

    toggleStatus(index: number, id: number) {
        let todo = this._todos[index];
        if (todo.id === id) {
            todo.completed = !todo.completed;
        }
        this.trigger();
    }

    toggleShowComplete() {
        this._showComplete = !this._showComplete;
        this.trigger();
    }

    @autoSubscribe
    getTodos(): Todo[] {
        if (this._showComplete) {
            return this._todos;
        } else {
            return this._todos.filter((todo) => !todo.completed);
        }
    }

    @autoSubscribe
    getShowComplete(): boolean {
        return this._showComplete;
    }
}

export = new TodosStore();