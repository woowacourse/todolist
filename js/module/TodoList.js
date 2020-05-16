import { todoItemTemplate } from '../util/templates.js'

export function TodoList() {
    const $todoList = document.querySelector("#new-todo-title");

    this.setState = updatedTodoItems => {
        this.todoItems = updatedTodoItems;
        this.render(this.todoItems);
    };

    this.render = items => {
        const template = items.map(item => todoItemTemplate(item));
        $todoList.innerHTML = template.join("");
    };
}