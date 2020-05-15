import { listTemplate } from './Templates.js';

export function TodoList() {
  this.$todoList = document.querySelector("#todo-list");

  this.setState = updatedTodoItems => {
    this.render(updatedTodoItems);
  };

  this.render = items => {
    const template = items.map(listTemplate);
    this.$todoList.innerHTML = template.join("");
  };
}