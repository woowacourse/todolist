import {todoCountTemplate} from "../templates/TodoCountTemplate.js";

export function TodoCount() {
  const $countContainer = document.querySelector(".todo-count");

  this.render = (count) => {
    $countContainer.innerHTML = todoCountTemplate(count);
  }
}