import { StoreBase, AutoSubscribeStore, autoSubscribe } from 'resub';
import { Todo } from '../types';

@AutoSubscribeStore
class TodosStore extends StoreBase {
    private _todos: Todo[] = [];
    private _nextID: number = 0;

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

    toggleStatus(id: number) {
        let todo = this._todos.find((todo) => {
            return todo.id === id;
        });
        todo.completed = !todo.completed;
        this.trigger();
    }

    @autoSubscribe
    getTodos() {
        return this._todos;
    }
}

export = new TodosStore();