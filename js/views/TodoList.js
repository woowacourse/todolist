import {todoListRender} from '../utils/Templates.js';

export class TodoList {
  constructor() {
    this.$todoList = document.querySelector("#todo-list");
  }

  render(todoItems) {
    this.$todoList.innerHTML = todoItems.map(todoItem => todoListRender(todoItem)).join("");
  }
}

