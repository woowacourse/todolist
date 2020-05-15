import {todoCountTemplate} from "../templates/todoCountTemplate.js";

export function TodoCount() {
  const $countContainer = document.querySelector(".count-container");

  this.render = (count) => {
    $countContainer.innerHTML = todoCountTemplate(count);
  }
}