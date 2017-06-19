import { StoreBase, AutoSubscribeStore, autoSubscribe } from 'resub';
import { Todo } from '../types';

@AutoSubscribeStore
class TodosStore extends StoreBase {
    // Base Data
    private _todos: Todo[] = [];
    private _nextID: number = 0;

    // Editing
    private _todoText: string = '';
    private _todoIndexToEdit: number = -1;
    private _todoIDToEdit: number = -1;

    // Visualization
    private _showComplete: boolean = true;


    /*
     Store Operations
     */
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

    submitTodo() {
        if (this._todoIndexToEdit === -1) {
            this._addTodo();
        } else {
            this._confirmEditedTodo();
        }
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

    editTodoText(todoText: string) {
        this._todoText = todoText;
        this.trigger();
    }

    editTodo(index: number, id: number) {
        let todo = this._todos[index];
        if (todo.id === id) {
            this._todoText = todo.name;
            this._todoIDToEdit = id;
            this._todoIndexToEdit = index;
            this.trigger();
        }
    }

    removeTodo(index: number, id: number) {
        if (this._todos[index].id === id) {
            this._todos.splice(index, 1);

            if (index === this._todoIndexToEdit && id === this._todoIDToEdit) {
                this._todoIDToEdit = -1;
                this._todoIndexToEdit = -1;
            }

            this.trigger();
        }
    }


    /*
     Subscribers
     */
    @autoSubscribe
    getTodoText(): string {
        return this._todoText;
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


    /*
     Private Operations
     */
    private _addTodo() {
        const todo: Todo = {
            id: this._nextID,
            name: this._todoText,
            completed: false,
        };
        this._nextID++;

        // Don't use .push here, we need a new array since the old _todos array was passed to the component by reference value
        this._todos = this._todos.concat(todo);
        this._todoText = '';
        this.trigger();
    }

    private _confirmEditedTodo() {
        let todo = this._todos[this._todoIndexToEdit];
        if (todo.id === this._todoIDToEdit) {
            todo.name = this._todoText;
        }

        this._todoText = '';
        this._todoIndexToEdit = -1;
        this._todoIDToEdit = -1;
        this.trigger();
    }
}

export = new TodosStore();
