import { todoItemTemplate } from "../utils/Templates.js";

class TodoList {
    constructor(todoItems) {
        this.$todoList = document.querySelector("#todo-list");
        this.render(todoItems);
    }

    render(todoItems) {
        this.$todoList.innerHTML = todoItems
                .map(todoItem => todoItemTemplate(todoItem))
                .join("");
    }
}

export default TodoList;
