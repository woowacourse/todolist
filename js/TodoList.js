import { listTemplate } from './Templates.js';

export function TodoList() {
  this.$todoList = document.querySelector("#todo-list");

  this.render = updatedTodoItems => {
    const template = updatedTodoItems.map(listTemplate);
    this.$todoList.innerHTML = template.join("");
  };
}