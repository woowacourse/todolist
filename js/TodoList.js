import { TodoItemTemplate } from './Template.js'

// todoList 보여주는 컴포넌트
export function TodoList() {
    this.$todoList = document.querySelector("#todo-list");

    this.setState = updatedTodoItems => {
        this.render(updatedTodoItems);
    };

    this.render = items => {
        const template = items.map(TodoItemTemplate);
        this.$todoList.innerHTML = template.join("");
    };
}