import template from "./TodoItem.js";

export default class TodoList {
  constructor(items) {
    this.$todoList = document.querySelector("#todo-list");
    this.render(items);
  }

  render(items) {
    this.$todoList.innerHTML = items.map(item => template(item)).join("");
  }
}
