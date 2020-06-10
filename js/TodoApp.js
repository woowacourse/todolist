import { TODO_ITEM_STATE } from './utils/Constants.js';
import TodoInput from './views/TodoInput.js';
import TodoList from './views/TodoList.js';
import TodoItem from './views/TodoItem.js';

class TodoApp {
    constructor() {
        this.todoItems = [];

        this.todoInput = new TodoInput({ onAdd: this.onAdd.bind(this) });
        this.todoList = new TodoList(this.todoItems, { onToggleCompleted: this.onToggleCompleted.bind(this) });
    }

    onAdd(contents) {
        const newTodoItem = new TodoItem(Date.now(), contents, TODO_ITEM_STATE.DOING);
        this.todoItems.push(newTodoItem);
        this.setState(this.todoItems);
    }

    onToggleCompleted(id) {
        const updatedItems = this.todoItems.map((todoItem) => {
            if (todoItem.id === Number(id)) {
                todoItem.toggle();
            }
            return todoItem;
        });
        this.setState(updatedItems);
    }

    onDelete(id) {
        const updatedItems = this.todoItems.
    }

    setState(updatedItems) {
        this.todoItems = updatedItems;
        this.todoList.render(updatedItems);
    }
}

export default TodoApp;
