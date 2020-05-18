import {todoItemTemplate} from "../utils/Templates.js";
import TodoItem from "./TodoItem.js";

function TodoList(onToggleItemHandler) {
    this.$todoList = document.querySelector("#todo-list");
    this.todoItems = []

    this.setState = updatedItems => {
        this.todoItems.filter()
        this.render(updatedItems)
    }

    this.render = items => {
        const template = items.map(todoItemTemplate)
        this.$todoList.innerHTML = template.join("");
    }

    this.TodoItem = new TodoItem(onToggleItemHandler)
}

export default TodoList;