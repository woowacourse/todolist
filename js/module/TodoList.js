import { todoItemTemplate } from '../util/templates.js'

export function TodoList(todoList) {
    this.setState = updatedTodoItems => {
        this.todoItems = updatedTodoItems;
        this.render(this.todoItems);
    };

    this.render = items => {
        const template = items.map(todoItemTemplate);
        todoList.innerHTML = template.join("");
    };
}