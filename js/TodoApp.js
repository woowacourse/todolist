import { TODO_ITEM_STATE } from './utils/Constants.js';
import TodoInput from './views/TodoInput.js';
import TodoList from './views/TodoList.js';
import TodoItem from './views/TodoItem.js';
import TodoCount from './views/TodoCount.js';

class TodoApp {
    constructor() {
        this.todoItems = [];

        this.todoInput = new TodoInput({ onAdd: this.onAdd.bind(this) });
        this.todoList = new TodoList(this.todoItems, {
            onToggleCompleted: this.onToggleCompleted.bind(this),
            onDelete: this.onDelete.bind(this),
        });
        this.todoCount = new TodoCount(this.todoItems.length);
    }

    onAdd(contents) {
        const newTodoItem = new TodoItem(Date.now(), contents, TODO_ITEM_STATE.DOING);
        this.todoItems.push(newTodoItem);
        this.setState(this.todoItems);
    }

    onToggleCompleted(id) {
        const updatedItems = this.todoItems.map((todoItem) => {
            if (todoItem.id === Number(id)) {
                todoItem.toggleCompleted();
            }
            return todoItem;
        });
        this.setState(updatedItems);
    }

    onDelete(id) {
        const updatedItems = this.todoItems.filter((todoItem) => todoItem.id !== Number(id));
        this.setState(updatedItems);
    }

    setState(updatedItems) {
        this.todoItems = updatedItems;
        this.todoList.render(updatedItems);
        this.todoCount.render(updatedItems.length);
    }
}

export default TodoApp;
