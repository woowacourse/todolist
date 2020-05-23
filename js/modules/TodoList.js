import {todoItemTemplate} from "../../utils/Templates.js";

export const TodoList = function () {
  const $todoList = document.querySelector("#todo-list");

  this.render = items => {
    const template = items.map(todoItemTemplate);
    $todoList.innerHTML = template.join("");
  };
}