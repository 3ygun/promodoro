import { StoreBase, AutoSubscribeStore, autoSubscribe, autoSubscribeWithKey } from 'resub';
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

    // Keys
    public static Key_TodoText = "Key_TodoText";


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
        if (todo.id !== id) {
            todo = this._todos.find((item) => item.id === id);
        }
        todo.completed = !todo.completed;
        this.trigger();
    }

    toggleShowComplete() {
        this._showComplete = !this._showComplete;
        this.trigger();
    }

    editTodoText(todoText: string) {
        this._todoText = todoText;
        this.trigger(TodosStore.Key_TodoText);
    }

    editTodo(index: number, id: number) {
        let makeEdit = () => {
            this._todoText = todo.name;
            this._todoIDToEdit = id;
            this._todoIndexToEdit = index;
            this.trigger();
        };

        let todo = this._todos[index];
        if (todo.id === id) {
            makeEdit();
        } else {
            index = this._todos.findIndex((item) => item.id === id);
            todo = this._todos[index];
            if (todo.id === id) {
                makeEdit();
            }
        }
    }

    removeTodo(index: number, id: number) {
        if (this._todos[index].id === id) {
            this._todos.splice(index, 1);
            this.trigger();
        } else if (!this._showComplete) {
            // If hiding complete then the provided index can be off
            index = this._todos.findIndex((item) => item.id === id);
            this._todos.splice(index, 1);
            this.trigger();
        }

        if (id === this._todoIDToEdit) {
            this._todoIDToEdit = -1;
            this._todoIndexToEdit = -1;
        }
    }


    /*
     Subscribers
     */
    @autoSubscribeWithKey(TodosStore.Key_TodoText)
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
        if (this._todoText !== '') {
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
    }

    private _confirmEditedTodo() {
        let todo = this._todos[this._todoIndexToEdit];
        if (todo === undefined || todo.id !== this._todoIDToEdit) {
            this._todoIndexToEdit = this._todos.findIndex((item) => item.id === this._todoIDToEdit);
            todo = this._todos[this._todoIndexToEdit];
        }
        
        todo.name = this._todoText;
        this._todoText = '';
        this._todoIndexToEdit = -1;
        this._todoIDToEdit = -1;
        this.trigger();
    }
}

export = new TodosStore();
