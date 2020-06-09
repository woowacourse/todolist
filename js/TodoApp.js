import { TODO_ITEM_STATE } from "./utils/Constants.js";
import TodoInput from "./views/TodoInput.js";
import TodoList from "./views/TodoList.js";
import TodoItem from "./views/TodoItem.js"

class TodoApp {
    constructor() {
        this.todoItems = [];

        this.todoInput = new TodoInput({ onAdd: this.onAdd });
        this.todoList = new TodoList(this.todoItems);
    }

    onAdd = contents => {
        const newTodoItem = new TodoItem(contents, TODO_ITEM_STATE.DOING);
        this.todoItems.push(newTodoItem);
        this.setState(this.todoItems);
    }

    setState = updatedItems => {
        this.todoItems = updatedItems;
        this.todoList.render(updatedItems);
    }
}

export default TodoApp;
