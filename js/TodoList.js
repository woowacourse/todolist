import {itemTemplate} from "./templates.js";

export default (items) => {
  const $todoList = document.querySelector("#todo-list");
  const $todoCount = document.querySelector("#todo-count");

  const render = (items) => {
    $todoList.innerHTML = items.map(item => itemTemplate(item)).join("");
    $todoCount.innerText = items.length;
    document.querySelectorAll(".checked").forEach(x => x.setAttribute("checked", true));
  };

  render(items);
}
